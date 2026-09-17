// Pulls a small daily "what's new" feed for each Deep Tech domain, then has
// Claude actually read each article (via the web_fetch tool) and write a
// real ~700-word summary plus a small diagram spec, so a visitor never has
// to leave the page to get the substance of a story.
//
// Sources are legitimate public JSON APIs rather than scraped HTML:
//   - Hacker News (via the Algolia search API, free/keyless) for four domains
//   - The Spaceflight News API (free/keyless) for "Out of This World"
//
// Run daily by .github/workflows/deep-tech-feed.yml. Writes
// src/data/deepTechFeed.json. Resilient to partial failure at every level:
// a domain whose article-list fetch fails keeps its previous data: an item
// whose AI summary fails just ships without one (title/link only, frontend
// falls back to "read the source").
//
// Requires ANTHROPIC_API_KEY in the environment to generate summaries; if
// unset, the script still runs and produces title/link-only items (no
// summaries), so this is safe to run locally without a key.

import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Anthropic from '@anthropic-ai/sdk'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_PATH = path.join(__dirname, '..', 'src', 'data', 'deepTechFeed.json')

// Items per domain that get the full AI treatment. Each one costs a real,
// small amount against the API key in ANTHROPIC_API_KEY (web-fetch input +
// a ~700-word output on Sonnet 5) - keep this modest rather than cranking
// it up without thinking about the bill.
const PER_DOMAIN = 3

const HN_QUERIES = {
  healthcare: ['biotech', 'digital health', 'gene therapy'],
  computing: ['semiconductor', 'quantum computing', 'AI chip'],
  manufacturing: ['robotics', '3d printing', 'supply chain'],
  'new-innovation': ['startup funding', 'breakthrough technology', 'emerging tech'],
}

const DOMAIN_LABELS = {
  healthcare: 'healthcare and biotech',
  computing: 'computing and semiconductors',
  manufacturing: 'manufacturing and industrial technology',
  'new-innovation': 'emerging technology and startups',
  'out-of-this-world': 'space technology',
}

const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null

async function fetchJSON(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'deep-tech-feed-bot' } })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`)
  return res.json()
}

async function fetchHNDomain(queries) {
  const seen = new Map()
  for (const q of queries) {
    const url = `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(q)}&tags=story&hitsPerPage=8`
    const data = await fetchJSON(url)
    for (const hit of data.hits || []) {
      if (!hit.title) continue
      const url_ = hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`
      if (!seen.has(hit.objectID)) {
        seen.set(hit.objectID, {
          title: hit.title,
          url: url_,
          source: 'Hacker News',
          publishedAt: hit.created_at,
        })
      }
    }
  }
  return [...seen.values()]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, PER_DOMAIN)
}

async function fetchSpaceflightNews() {
  const data = await fetchJSON('https://api.spaceflightnewsapi.net/v4/articles/?limit=8&ordering=-published_at')
  return (data.results || [])
    .map((a) => ({
      title: a.title,
      url: a.url,
      source: a.news_site || 'Spaceflight News',
      publishedAt: a.published_at,
    }))
    .slice(0, PER_DOMAIN)
}

function extractJSON(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  const raw = fenced ? fenced[1] : text
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('no JSON object found in response')
  return JSON.parse(raw.slice(start, end + 1))
}

async function summarizeArticle(item, domainLabel) {
  if (!anthropic) return null

  const prompt = `Fetch this article: ${item.url}

Title: "${item.title}"

Write a detailed, accurate summary of the article for someone interested in ${domainLabel} - about 700 words, substantive enough that reading it means they don't need to open the original link. Base it only on what the article actually says; don't pad with generic background.

Then produce a small diagram spec that visualizes the article's key structure - either a "flow" (if it describes a sequential process) or a "stack" (if it describes layered/architectural concepts), with 3 to 6 short labels (a few words each).

Respond with ONLY this JSON object - no markdown fences, no other text:
{"summary": "<the ~700 word summary>", "diagram": {"type": "flow" or "stack", "items": ["label 1", "label 2", "..."]}}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 2000,
    tools: [{ type: 'web_fetch_20260209', name: 'web_fetch', max_uses: 1 }],
    messages: [{ role: 'user', content: prompt }],
  })

  const textBlocks = response.content.filter((b) => b.type === 'text').map((b) => b.text)
  const finalText = textBlocks[textBlocks.length - 1]
  if (!finalText) throw new Error('no text response from model')

  const parsed = extractJSON(finalText)
  if (typeof parsed.summary !== 'string' || parsed.summary.length < 100) {
    throw new Error('summary missing or too short')
  }
  const diagram = parsed.diagram
  if (!diagram || !['flow', 'stack'].includes(diagram.type) || !Array.isArray(diagram.items) || diagram.items.length < 2) {
    throw new Error('diagram spec malformed')
  }

  return { summary: parsed.summary, diagram }
}

async function enrichDomain(items, domainKey) {
  const label = DOMAIN_LABELS[domainKey] || domainKey
  const enriched = []
  for (const item of items) {
    try {
      const extra = await summarizeArticle(item, label)
      enriched.push(extra ? { ...item, ...extra } : item)
    } catch (err) {
      console.log(`  summary failed for "${item.title}": ${err.message}`)
      enriched.push(item)
    }
  }
  return enriched
}

async function loadPrevious() {
  try {
    const raw = await readFile(OUT_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return { domains: {} }
  }
}

async function main() {
  if (!anthropic) {
    console.log('ANTHROPIC_API_KEY not set - generating title/link-only items, no AI summaries.')
  }

  const previous = await loadPrevious()
  const domains = { ...previous.domains }
  const errors = []

  const jobs = [
    ...Object.entries(HN_QUERIES).map(([key, queries]) => ({ key, fn: () => fetchHNDomain(queries) })),
    { key: 'out-of-this-world', fn: fetchSpaceflightNews },
  ]

  const results = await Promise.allSettled(jobs.map((j) => j.fn()))
  for (let i = 0; i < results.length; i++) {
    const { key } = jobs[i]
    const r = results[i]
    if (r.status === 'fulfilled' && r.value.length > 0) {
      console.log(`Enriching ${key} (${r.value.length} items)...`)
      domains[key] = await enrichDomain(r.value, key)
    } else {
      errors.push(`${key}: ${r.status === 'rejected' ? r.reason : 'no results'}`)
    }
  }

  const output = {
    generatedAt: new Date().toISOString(),
    domains,
  }

  await writeFile(OUT_PATH, JSON.stringify(output, null, 2) + '\n')

  if (errors.length) {
    console.log('Some domains failed and kept previous data:')
    errors.forEach((e) => console.log(' -', e))
  }
  console.log('Wrote', OUT_PATH)
  for (const [key, items] of Object.entries(domains)) {
    const withSummary = items.filter((i) => i.summary).length
    console.log(`  ${key}: ${items.length} items (${withSummary} with AI summary)`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
