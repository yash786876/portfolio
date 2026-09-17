import { domainItems, feedGeneratedAt } from '../data/deepTechFeedHelpers.js'
import './BuzzChart.css'

const DOMAINS = [
  { key: 'healthcare', label: 'Healthcare' },
  { key: 'computing', label: 'Computing' },
  { key: 'manufacturing', label: 'Manufacturing' },
  { key: 'new-innovation', label: 'New Innovation' },
  { key: 'out-of-this-world', label: 'Out of This World' },
]

function formatDate(iso) {
  if (!iso) return 'never'
  return new Date(iso).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
}

function BuzzChart() {
  const counts = DOMAINS.map((d) => ({ ...d, count: domainItems(d.key).length }))
  const max = Math.max(1, ...counts.map((d) => d.count))
  const rowHeight = 34

  return (
    <div className="widget-card buzz-chart">
      <h2>Buzz by domain</h2>
      <p className="prose">How many fresh items landed in today's feed, per domain.</p>

      <svg
        className="buzz-svg"
        viewBox={`0 0 340 ${counts.length * rowHeight}`}
        role="img"
        aria-label="Bar chart of buzz item counts by Deep Tech domain"
      >
        {counts.map((d, i) => {
          const barMaxWidth = 340 - 132
          const barWidth = Math.max(4, (d.count / max) * barMaxWidth)
          const y = i * rowHeight
          return (
            <g key={d.key}>
              <text x="0" y={y + rowHeight / 2 + 4} className="buzz-label">
                {d.label}
              </text>
              <rect
                x="130"
                y={y + rowHeight / 2 - 7}
                width={barWidth}
                height="14"
                rx="4"
                className="buzz-bar"
              >
                <title>{`${d.label}: ${d.count} item${d.count === 1 ? '' : 's'}`}</title>
              </rect>
              <text x={130 + barWidth + 8} y={y + rowHeight / 2 + 4} className="buzz-value">
                {d.count}
              </text>
            </g>
          )
        })}
      </svg>

      <p className="caption buzz-updated">Last updated {formatDate(feedGeneratedAt())}</p>
    </div>
  )
}

export default BuzzChart
