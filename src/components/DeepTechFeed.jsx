import { useState } from 'react'
import { domainItems } from '../data/deepTechFeedHelpers.js'
import FlowDiagram from './FlowDiagram.jsx'
import StackDiagram from './StackDiagram.jsx'
import './DeepTechFeed.css'

function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const hours = Math.round(diffMs / 3600000)
  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  return `${days}d ago`
}

function BuzzItem({ item }) {
  const [open, setOpen] = useState(false)
  const hasSummary = Boolean(item.summary)

  return (
    <li className={`deep-feed-item${open ? ' deep-feed-open' : ''}`}>
      <button
        type="button"
        className="deep-feed-trigger"
        onClick={() => hasSummary && setOpen((o) => !o)}
        disabled={!hasSummary}
      >
        <span className="deep-feed-heading">
          <span className="deep-feed-title">{item.title}</span>
          <span className="deep-feed-meta">{item.source} · {timeAgo(item.publishedAt)}</span>
        </span>
        {hasSummary && (
          <span className="deep-feed-caret" aria-hidden="true">{open ? '−' : '+'}</span>
        )}
      </button>

      {!hasSummary && (
        <a href={item.url} target="_blank" rel="noreferrer" className="deep-feed-fallback-link">
          No AI summary for this one — read the source ↗
        </a>
      )}

      {open && hasSummary && (
        <div className="deep-feed-detail">
          <p className="prose">{item.summary}</p>
          {item.diagram?.type === 'flow' && <FlowDiagram steps={item.diagram.items} />}
          {item.diagram?.type === 'stack' && <StackDiagram layers={item.diagram.items} />}
          <a href={item.url} target="_blank" rel="noreferrer" className="deep-feed-source-link">
            Original source ↗
          </a>
        </div>
      )}
    </li>
  )
}

function DeepTechFeed({ domainKey, limit = 5 }) {
  const items = domainItems(domainKey).slice(0, limit)

  if (items.length === 0) {
    return <p className="prose">No feed data yet — the daily update hasn't run.</p>
  }

  return (
    <ul className="deep-feed">
      {items.map((item, i) => (
        <BuzzItem item={item} key={i} />
      ))}
    </ul>
  )
}

export default DeepTechFeed
