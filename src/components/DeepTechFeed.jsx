import { domainItems } from '../data/deepTechFeedHelpers.js'
import './DeepTechFeed.css'

function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const hours = Math.round(diffMs / 3600000)
  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  return `${days}d ago`
}

function DeepTechFeed({ domainKey, limit = 5 }) {
  const items = domainItems(domainKey).slice(0, limit)

  if (items.length === 0) {
    return <p className="prose">No feed data yet — the daily update hasn't run.</p>
  }

  return (
    <ul className="deep-feed">
      {items.map((item, i) => (
        <li key={i}>
          <a href={item.url} target="_blank" rel="noreferrer" className="deep-feed-title">
            {item.title}
          </a>
          <span className="deep-feed-meta">{item.source} · {timeAgo(item.publishedAt)}</span>
        </li>
      ))}
    </ul>
  )
}

export default DeepTechFeed
