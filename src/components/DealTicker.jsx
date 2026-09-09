import './DealTicker.css'

const deals = [
  'YASH CAPITAL closes $2 seed round in vibes only',
  'Analyst spotted modeling a DCF and a free-kick wall in the same afternoon',
  'Sources say the "Apps I Built" tab is Series A-ready, valuation TBD',
  'Breaking: local footballer diversifies portfolio, still can\'t pass with left foot',
  'Rating agencies downgrade Monday mornings to junk status',
  'Yash Santwani named "Most Likely to Reply with a Spreadsheet" three years running',
]

const loop = [...deals, ...deals]

function DealTicker() {
  return (
    <div className="ticker" role="marquee" aria-label="Fake deal headlines">
      <div className="ticker-track">
        {loop.map((d, i) => (
          <span className="ticker-item" key={i}>
            📈 {d}
          </span>
        ))}
      </div>
    </div>
  )
}

export default DealTicker
