import { useEffect, useRef, useState } from 'react'
import './BullBearReflex.css'

function tierFor(ms) {
  if (ms < 250) return 'Algo-fast. ⚡'
  if (ms < 450) return 'Sharp analyst reflexes.'
  if (ms < 800) return 'Textbook timing.'
  return 'The market moved on without you.'
}

function readBest() {
  try {
    const v = localStorage.getItem('bull-bear-best')
    return v ? Number(v) : null
  } catch {
    return null
  }
}

function writeBest(ms) {
  try {
    localStorage.setItem('bull-bear-best', String(ms))
  } catch {
    // ignore
  }
}

function BullBearReflex() {
  const [phase, setPhase] = useState('idle') // idle | waiting | active | done
  const [side, setSide] = useState(null) // 'bull' | 'bear'
  const [message, setMessage] = useState('Click Start, then react to the prompt.')
  const [best, setBest] = useState(readBest)
  const startTime = useRef(0)
  const waitTimer = useRef(null)

  useEffect(() => () => clearTimeout(waitTimer.current), [])

  function start() {
    setPhase('waiting')
    setMessage('Wait for it…')
    const delay = 700 + Math.random() * 1800
    waitTimer.current = setTimeout(() => {
      setSide(Math.random() < 0.5 ? 'bull' : 'bear')
      startTime.current = performance.now()
      setPhase('active')
    }, delay)
  }

  function answer(choice) {
    if (phase === 'waiting') {
      clearTimeout(waitTimer.current)
      setPhase('done')
      setMessage("False start! Insider trading isn't a strategy.")
      return
    }
    if (phase !== 'active') return

    const ms = Math.round(performance.now() - startTime.current)
    const correct = (choice === 'buy' && side === 'bull') || (choice === 'sell' && side === 'bear')
    setPhase('done')
    if (!correct) {
      setMessage('Wrong call — that\'s how funds blow up. 💀')
      return
    }
    if (best === null || ms < best) {
      setBest(ms)
      writeBest(ms)
    }
    setMessage(`${ms}ms — ${tierFor(ms)}`)
  }

  return (
    <div className="widget-card">
      <div className="stat-row">
        <div className="stat">
          <span className="stat-value">{best !== null ? `${best}ms` : '—'}</span>
          <span className="stat-label">Best reaction</span>
        </div>
      </div>

      <div className="reflex-field">
        {phase === 'active' ? (
          <span className="reflex-prompt">{side === 'bull' ? '🐂 BULL' : '🐻 BEAR'}</span>
        ) : (
          <span className="reflex-hint">{phase === 'waiting' ? 'Wait for it…' : 'Ready?'}</span>
        )}
      </div>

      <div className="reflex-actions">
        {phase === 'idle' || phase === 'done' ? (
          <button type="button" className="reflex-start" onClick={start}>
            {phase === 'done' ? 'Try again' : 'Start round'}
          </button>
        ) : (
          <>
            <button type="button" className="reflex-buy" onClick={() => answer('buy')}>
              Buy 📈
            </button>
            <button type="button" className="reflex-sell" onClick={() => answer('sell')}>
              Sell 📉
            </button>
          </>
        )}
      </div>

      <p className="caption">{message}</p>
    </div>
  )
}

export default BullBearReflex
