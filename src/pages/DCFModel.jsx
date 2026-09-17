import { useMemo, useState } from 'react'
import './DCFModel.css'

function formatMoney(n) {
  return n.toLocaleString('en-US', { maximumFractionDigits: 1 })
}

function computeDCF({ fcf0, growth, years, wacc, terminalGrowth }) {
  const g = growth / 100
  const r = wacc / 100
  const tg = terminalGrowth / 100

  const rows = []
  let sumPV = 0
  let lastFCF = fcf0
  for (let t = 1; t <= years; t++) {
    const fcf = fcf0 * Math.pow(1 + g, t)
    const pv = fcf / Math.pow(1 + r, t)
    rows.push({ year: t, fcf, pv })
    sumPV += pv
    lastFCF = fcf
  }

  const waccExceedsTerminal = r > tg
  const terminalValue = waccExceedsTerminal ? (lastFCF * (1 + tg)) / (r - tg) : null
  const pvTerminal = waccExceedsTerminal ? terminalValue / Math.pow(1 + r, years) : null
  const enterpriseValue = waccExceedsTerminal ? sumPV + pvTerminal : null

  return { rows, sumPV, terminalValue, pvTerminal, enterpriseValue, waccExceedsTerminal }
}

function DCFModel() {
  const [fcf0, setFcf0] = useState(100)
  const [growth, setGrowth] = useState(12)
  const [years, setYears] = useState(5)
  const [wacc, setWacc] = useState(9)
  const [terminalGrowth, setTerminalGrowth] = useState(3)

  const result = useMemo(
    () => computeDCF({ fcf0, growth, years, wacc, terminalGrowth }),
    [fcf0, growth, years, wacc, terminalGrowth],
  )

  return (
    <section className="page">
      <h1>DCF Model</h1>
      <p className="prose">
        A discounted cash flow model values a business as the sum of its
        future free cash flows, discounted back to today. Replace the real
        walkthrough here — the calculator below runs a standard two-stage
        DCF live as you change the assumptions.
      </p>

      <ul className="posts">
        <li><span className="post-title">Revenue growth assumptions</span><span className="post-date">Drive the projection period below</span></li>
        <li><span className="post-title">WACC / discount rate</span><span className="post-date">The cost of capital used to discount cash flows</span></li>
        <li><span className="post-title">Terminal value method</span><span className="post-date">Gordon growth (perpetuity) model</span></li>
        <li><span className="post-title">Implied valuation range</span><span className="post-date">Try a few scenarios below</span></li>
      </ul>

      <div className="widget-card dcf-calc">
        <h2>Try it yourself</h2>

        <div className="dcf-inputs">
          <label className="dcf-field">
            <span>Base year FCF ($M)</span>
            <input type="number" min="1" value={fcf0} onChange={(e) => setFcf0(Number(e.target.value) || 0)} />
          </label>
          <label className="dcf-field">
            <span>FCF growth rate ({growth}%)</span>
            <input type="range" min="-10" max="40" step="1" value={growth} onChange={(e) => setGrowth(Number(e.target.value))} />
          </label>
          <label className="dcf-field">
            <span>Projection years ({years})</span>
            <input type="range" min="3" max="10" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </label>
          <label className="dcf-field">
            <span>WACC ({wacc}%)</span>
            <input type="range" min="1" max="20" step="0.5" value={wacc} onChange={(e) => setWacc(Number(e.target.value))} />
          </label>
          <label className="dcf-field">
            <span>Terminal growth ({terminalGrowth}%)</span>
            <input type="range" min="0" max="6" step="0.5" value={terminalGrowth} onChange={(e) => setTerminalGrowth(Number(e.target.value))} />
          </label>
        </div>

        {!result.waccExceedsTerminal ? (
          <p className="caption">WACC must be greater than terminal growth for the model to converge — adjust the sliders.</p>
        ) : (
          <>
            <div className="dcf-table-wrap">
              <table className="dcf-table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>FCF ($M)</th>
                    <th>PV of FCF ($M)</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((r) => (
                    <tr key={r.year}>
                      <td>{r.year}</td>
                      <td>{formatMoney(r.fcf)}</td>
                      <td>{formatMoney(r.pv)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="dcf-summary">
              <div className="dcf-summary-row">
                <span>Sum of PV of explicit FCFs</span>
                <span>${formatMoney(result.sumPV)}M</span>
              </div>
              <div className="dcf-summary-row">
                <span>Terminal value (undiscounted)</span>
                <span>${formatMoney(result.terminalValue)}M</span>
              </div>
              <div className="dcf-summary-row">
                <span>PV of terminal value</span>
                <span>${formatMoney(result.pvTerminal)}M</span>
              </div>
              <div className="dcf-summary-row dcf-total">
                <span>Implied enterprise value</span>
                <span>${formatMoney(result.enterpriseValue)}M</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default DCFModel
