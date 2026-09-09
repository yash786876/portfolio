import { useEffect, useRef, useState } from 'react'
import './WhackABuzzword.css'

const WORDS = [
  'Synergy', 'Disrupt', 'Pivot', 'Moonshot', 'Web3', 'Ecosystem',
  'Ten-bagger', 'Alpha', 'Blockchain', 'Circle back', 'Bandwidth', 'Growth hack',
]

const ROUND_SECONDS = 15
const CELL_COUNT = 9

function tierFor(score) {
  if (score >= 10) return "You might actually run a VC fund."
  if (score >= 6) return 'Certified buzzword slayer. 🏆'
  if (score >= 3) return 'Solid moderator instincts.'
  return "Buzzword-immune — you clearly skip LinkedIn."
}

function WhackABuzzword() {
  const [phase, setPhase] = useState('idle') // idle | active | done
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS)
  const [activeCell, setActiveCell] = useState(-1)
  const [activeWord, setActiveWord] = useState('')
  const intervals = useRef([])

  useEffect(() => () => intervals.current.forEach((id) => clearInterval(id)), [])

  function start() {
    setScore(0)
    setTimeLeft(ROUND_SECONDS)
    setPhase('active')

    const spawn = setInterval(() => {
      setActiveCell(Math.floor(Math.random() * CELL_COUNT))
      setActiveWord(WORDS[Math.floor(Math.random() * WORDS.length)])
    }, 850)

    const countdown = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(spawn)
          clearInterval(countdown)
          setActiveCell(-1)
          setPhase('done')
          return 0
        }
        return t - 1
      })
    }, 1000)

    intervals.current = [spawn, countdown]
  }

  function whack(i) {
    if (phase !== 'active' || i !== activeCell) return
    setScore((s) => s + 1)
    setActiveCell(-1)
  }

  return (
    <div className="widget-card">
      <div className="stat-row">
        <div className="stat">
          <span className="stat-value">{score}</span>
          <span className="stat-label">Buzzwords whacked</span>
        </div>
        <div className="stat">
          <span className="stat-value">{phase === 'active' ? timeLeft : ROUND_SECONDS}</span>
          <span className="stat-label">Seconds left</span>
        </div>
      </div>

      <div className="whack-grid">
        {Array.from({ length: CELL_COUNT }).map((_, i) => (
          <button
            type="button"
            key={i}
            className={`whack-cell${i === activeCell ? ' whack-cell-active' : ''}`}
            onClick={() => whack(i)}
            disabled={phase !== 'active'}
          >
            {i === activeCell ? activeWord : ''}
          </button>
        ))}
      </div>

      <div className="whack-footer">
        {phase !== 'active' && (
          <button type="button" className="whack-start" onClick={start}>
            {phase === 'done' ? 'Play again' : 'Start round'}
          </button>
        )}
        <p className="caption">
          {phase === 'done'
            ? `${score} whacked — ${tierFor(score)}`
            : phase === 'active'
              ? 'Whack the buzzword before it disappears.'
              : "15 seconds. Whack every buzzword you see."}
        </p>
      </div>
    </div>
  )
}

export default WhackABuzzword
