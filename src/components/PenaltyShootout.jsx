import { useEffect, useRef, useState } from 'react'
import './PenaltyShootout.css'

const ZONES = [
  { x: 15, label: 'Far left' },
  { x: 32, label: 'Left' },
  { x: 50, label: 'Center' },
  { x: 68, label: 'Right' },
  { x: 85, label: 'Far right' },
]

const SAVE_RADIUS = 13
const REST_POS = { x: 50, y: 88 }

const GOAL_LINES = [
  'GOAL! Fully diversified into the top corner. ⚽📈',
  "Back of the net — that's alpha.",
  'Certified moonshot. 🚀',
  'In. Somebody alert the LPs.',
  'GOAL! Beat the benchmark and the keeper.',
]

const SAVE_LINES = [
  "Saved. That's a covenant breach.",
  'Denied — due diligence works both ways.',
  'Keeper called your bluff.',
  'Blocked. Back to the model.',
  'Saved. Diversification would have helped.',
]

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function PenaltyShootout() {
  const [keeperX, setKeeperX] = useState(50)
  const [ballPos, setBallPos] = useState(REST_POS)
  const [phase, setPhase] = useState('idle') // idle | flying | result
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [caption, setCaption] = useState('Pick a corner. The keeper is watching.')
  const timers = useRef([])

  useEffect(() => {
    const moveKeeper = () => {
      setKeeperX(15 + Math.random() * 70)
    }
    const id = setInterval(moveKeeper, 1100)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const pending = timers.current
    return () => {
      pending.forEach((t) => clearTimeout(t))
    }
  }, [])

  function shoot(zone) {
    if (phase !== 'idle') return
    const kx = keeperX
    setPhase('flying')
    setAttempts((a) => a + 1)
    setBallPos({ x: zone.x, y: 10 })
    setCaption('…')

    const t1 = setTimeout(() => {
      const saved = Math.abs(zone.x - kx) <= SAVE_RADIUS
      if (saved) {
        setCaption(pick(SAVE_LINES))
        setPhase('result-save')
      } else {
        setScore((s) => s + 1)
        setCaption(pick(GOAL_LINES))
        setPhase('result-goal')
      }

      const t2 = setTimeout(() => {
        setBallPos(REST_POS)
        setPhase('idle')
      }, 1000)
      timers.current.push(t2)
    }, 450)
    timers.current.push(t1)
  }

  return (
    <div className="widget-card">
      <div className="stat-row">
        <div className="stat">
          <span className="stat-value">{score}</span>
          <span className="stat-label">Goals</span>
        </div>
        <div className="stat">
          <span className="stat-value">{attempts}</span>
          <span className="stat-label">Attempts</span>
        </div>
      </div>

      <div className="field shoot-field">
        <div className="field-lines" aria-hidden="true" />
        <div className="goal-line" aria-hidden="true" />
        <div className="keeper" style={{ left: `${keeperX}%` }} aria-hidden="true">
          🧤
        </div>

        {ZONES.map((z) => (
          <button
            key={z.x}
            type="button"
            className="zone-dot"
            style={{ left: `${z.x}%` }}
            onClick={() => shoot(z)}
            disabled={phase !== 'idle'}
            aria-label={`Shoot ${z.label}`}
          />
        ))}

        <div
          className={`ball${phase === 'result-goal' ? ' pulse-goal' : ''}${phase === 'result-save' ? ' pulse-save' : ''}`}
          style={{ left: `${ballPos.x}%`, top: `${ballPos.y}%` }}
        >
          ⚽
        </div>
      </div>

      <p className="caption">{caption}</p>
    </div>
  )
}

export default PenaltyShootout
