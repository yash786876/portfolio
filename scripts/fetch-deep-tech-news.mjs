// Pulls a small daily "what's new" feed for each Deep Tech domain.
//
// Deliberately uses legitimate public JSON APIs instead of scraping HTML off
// arbitrary sites — more robust (APIs have a stable shape; HTML doesn't),
// and doesn't fight anyone's terms of service:
//   - Hacker News (via the Algolia search API, free/keyless) for four domains
//   - The Spaceflight News API (free/keyless) for "Out of This World"
//
// Run daily by .github/workflows/deep-tech-feed.yml. Writes
// src/data/deepTechFeed.json. On a fetch failure for one domain, the
// previous data for that domain is kept rather than wiped.

import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_PATH = path.join(__dirname, '..', 'src', 'data', 'deepTechFeed.json')
const PER_DOMAIN = 5

const HN_QUERIES = {
  healthcare: ['biotech', 'digital health', 'gene therapy'],
  computing: ['semiconductor', 'quantum computing', 'AI chip'],
  manufacturing: ['robotics', '3d printing', 'supply chain'],
  'new-innovation': ['startup funding', 'breakthrough technology', 'emerging tech'],
}

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

async function loadPrevious() {
  try {
    const raw = await readFile(OUT_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return { domains: {} }
  }
}

async function main() {
  const previous = await loadPrevious()
  const domains = { ...previous.domains }
  const errors = []

  const jobs = [
    ...Object.entries(HN_QUERIES).map(([key, queries]) => ({ key, fn: () => fetchHNDomain(queries) })),
    { key: 'out-of-this-world', fn: fetchSpaceflightNews },
  ]

  const results = await Promise.allSettled(jobs.map((j) => j.fn()))
  results.forEach((r, i) => {
    const { key } = jobs[i]
    if (r.status === 'fulfilled' && r.value.length > 0) {
      domains[key] = r.value
    } else {
      errors.push(`${key}: ${r.status === 'rejected' ? r.reason : 'no results'}`)
    }
  })

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
    console.log(`  ${key}: ${items.length} items`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
