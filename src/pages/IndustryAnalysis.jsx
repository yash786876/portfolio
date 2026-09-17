import { useMemo, useState } from 'react'
import './IndustryAnalysis.css'

const FORCES = [
  { key: 'entrants', label: 'Threat of New Entrants', hint: 'How easy is it for a new competitor to show up?' },
  { key: 'suppliers', label: 'Bargaining Power of Suppliers', hint: 'How much leverage do suppliers have over price and terms?' },
  { key: 'buyers', label: 'Bargaining Power of Buyers', hint: 'How much leverage do customers have to demand better terms?' },
  { key: 'substitutes', label: 'Threat of Substitutes', hint: 'How easily can customers switch to an alternative?' },
  { key: 'rivalry', label: 'Competitive Rivalry', hint: 'How intense is the fight among existing players?' },
]

function verdictFor(avg) {
  if (avg <= 2) return 'Highly attractive — low competitive pressure across the board.'
  if (avg <= 3.5) return 'Moderately attractive — mixed pressures, worth digging into the details.'
  return 'Tough industry — high competitive intensity on most forces.'
}

function IndustryAnalysis() {
  const [ratings, setRatings] = useState({ entrants: 3, suppliers: 3, buyers: 3, substitutes: 3, rivalry: 3 })

  const avg = useMemo(() => {
    const values = Object.values(ratings)
    return values.reduce((a, b) => a + b, 0) / values.length
  }, [ratings])

  function setForce(key, value) {
    setRatings((r) => ({ ...r, [key]: value }))
  }

  return (
    <section className="page">
      <h1>Industry Analysis</h1>
      <p className="prose">
        A framework for breaking down any industry you're studying — swap in
        the real sector and findings.
      </p>

      <ul className="posts">
        <li><span className="post-title">Porter's Five Forces</span><span className="post-date">Rate them below</span></li>
        <li><span className="post-title">TAM / SAM / SOM</span><span className="post-date">Total, serviceable, and obtainable market</span></li>
        <li><span className="post-title">Key players & positioning</span><span className="post-date">Who else is in the room</span></li>
        <li><span className="post-title">Tailwinds / headwinds</span><span className="post-date">What's pushing the industry forward or back</span></li>
      </ul>

      <div className="widget-card ia-framework">
        <h2>Porter's Five Forces</h2>
        <p className="prose">
          A framework for judging how attractive an industry actually is.
          Five forces shape competition — the weaker each force, the more
          attractive the industry.
        </p>
        <ul className="posts">
          <li><span className="post-title">Threat of New Entrants</span><span className="post-date">Barriers to entry — capital, regulation, brand</span></li>
          <li><span className="post-title">Bargaining Power of Suppliers</span><span className="post-date">Can suppliers squeeze your margins?</span></li>
          <li><span className="post-title">Bargaining Power of Buyers</span><span className="post-date">Can customers demand lower prices?</span></li>
          <li><span className="post-title">Threat of Substitutes</span><span className="post-date">How easily can they switch to something else?</span></li>
          <li><span className="post-title">Competitive Rivalry</span><span className="post-date">How fierce is the existing fight?</span></li>
        </ul>
      </div>

      <div className="widget-card ia-tool">
        <h2>Rate the forces</h2>
        <p className="prose">Slide each force from 1 (favorable) to 5 (brutal) for whatever industry you're studying.</p>

        {FORCES.map((f) => (
          <div className="ia-force" key={f.key}>
            <div className="ia-force-label">
              <span>{f.label}</span>
              <span className="ia-force-value">{ratings[f.key]}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={ratings[f.key]}
              onChange={(e) => setForce(f.key, Number(e.target.value))}
            />
            <p className="ia-force-hint">{f.hint}</p>
          </div>
        ))}

        <div className="ia-result">
          <span className="ia-avg">{avg.toFixed(1)}</span>
          <p className="caption">{verdictFor(avg)}</p>
        </div>
      </div>

      <div className="widget-card ia-framework">
        <h2>TAM / SAM / SOM</h2>
        <ul className="posts">
          <li><span className="post-title">TAM — Total Addressable Market</span><span className="post-date">Total demand for the product/service, globally</span></li>
          <li><span className="post-title">SAM — Serviceable Addressable Market</span><span className="post-date">The slice of TAM your business model can actually reach</span></li>
          <li><span className="post-title">SOM — Serviceable Obtainable Market</span><span className="post-date">What you can realistically capture in the near term</span></li>
        </ul>
      </div>
    </section>
  )
}

export default IndustryAnalysis
