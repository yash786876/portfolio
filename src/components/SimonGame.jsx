import { useEffect, useRef, useState } from 'react'
import './SimonGame.css'

const PADS = [
  { id: 0, emoji: '⚽', tone: 'green' },
  { id: 1, emoji: '📈', tone: 'amber' },
  { id: 2, emoji: '🏆', tone: 'teal' },
  { id: 3, emoji: '💰', tone: 'red' },
]

const SHOW_MS = 550
const GAP_MS = 250

function readBest() {
  try {
    const v = localStorage.getItem('simon-best')
    return v ? Number(v) : 0
  } catch {
    return 0
  }
}

function writeBest(v) {
  try {
    localStorage.setItem('simon-best', String(v))
  } catch {
    // ignore
  }
}

function randomPad() {
  return Math.floor(Math.random() * 4)
}

function SimonGame() {
  const [sequence, setSequence] = useState([])
  const [phase, setPhase] = useState('idle') // idle | showing | input | over
  const [step, setStep] = useState(0)
  const [active, setActive] = useState(null)
  const [best, setBest] = useState(readBest)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach((t) => clearTimeout(t)), [])

  function playback(seq) {
    setPhase('showing')
    seq.forEach((padId, i) => {
      const onTimer = setTimeout(() => setActive(padId), i * (SHOW_MS + GAP_MS))
      const offTimer = setTimeout(() => setActive(null), i * (SHOW_MS + GAP_MS) + SHOW_MS)
      timers.current.push(onTimer, offTimer)
    })
    const doneTimer = setTimeout(() => {
      setPhase('input')
      setStep(0)
    }, seq.length * (SHOW_MS + GAP_MS))
    timers.current.push(doneTimer)
  }

  function start() {
    const first = [randomPad()]
    setSequence(first)
    playback(first)
  }

  function pressPad(id) {
    if (phase !== 'input') return
    if (id === sequence[step]) {
      if (step + 1 === sequence.length) {
        const next = [...sequence, randomPad()]
        if (sequence.length > best) {
          setBest(sequence.length)
          writeBest(sequence.length)
        }
        setSequence(next)
        const pause = setTimeout(() => playback(next), 500)
        timers.current.push(pause)
        setPhase('idle') // brief lock between rounds
      } else {
        setStep((s) => s + 1)
      }
    } else {
      if (sequence.length - 1 > best) {
        setBest(sequence.length - 1)
        writeBest(sequence.length - 1)
      }
      setPhase('over')
    }
  }

  const round = phase === 'idle' && sequence.length === 0 ? 0 : sequence.length

  return (
    <div className="widget-card">
      <div className="stat-row">
        <div className="stat">
          <span className="stat-value">{round}</span>
          <span className="stat-label">Round</span>
        </div>
        <div className="stat">
          <span className="stat-value">{best}</span>
          <span className="stat-label">Best</span>
        </div>
      </div>

      <div className="simon-grid">
        {PADS.map((p) => (
          <button
            type="button"
            key={p.id}
            className={`simon-pad simon-${p.tone}${active === p.id ? ' simon-lit' : ''}`}
            data-pad={p.id}
            onClick={() => pressPad(p.id)}
            disabled={phase !== 'input'}
          >
            {p.emoji}
          </button>
        ))}
      </div>

      <p className="caption">
        {phase === 'idle' && sequence.length === 0 && 'Watch the sequence, then repeat it.'}
        {phase === 'showing' && 'Watch closely…'}
        {phase === 'input' && 'Your turn.'}
        {phase === 'idle' && sequence.length > 0 && 'Nice — next round…'}
        {phase === 'over' && `Game over at round ${sequence.length}. Even the ball remembers better.`}
      </p>

      {(phase === 'idle' && sequence.length === 0) || phase === 'over' ? (
        <button type="button" className="widget-btn" onClick={start}>
          {phase === 'over' ? 'Play again' : 'Start'}
        </button>
      ) : null}
    </div>
  )
}

export default SimonGame
