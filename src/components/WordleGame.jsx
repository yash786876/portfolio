import { useState } from 'react'
import './WordleGame.css'

const WORDS = [
  'TRADE', 'STOCK', 'BONDS', 'ASSET', 'MONEY', 'SHARE', 'YIELD', 'GOALS',
  'TEAMS', 'MATCH', 'COACH', 'DRAFT', 'FUNDS', 'SPEND', 'VALUE', 'PRICE',
  'MODEL', 'ROUND', 'LEVEL', 'BOARD', 'GRIND', 'CHASE', 'SCALE', 'BUILD',
  'PITCH', 'TALLY', 'EQUAL', 'MERGE', 'AUDIT', 'BROKE', 'DEBIT',
]

const MAX_ATTEMPTS = 6
const ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

function pickWord(exclude) {
  let w = WORDS[Math.floor(Math.random() * WORDS.length)]
  if (WORDS.length > 1) {
    while (w === exclude) w = WORDS[Math.floor(Math.random() * WORDS.length)]
  }
  return w
}

// Two-pass scoring so duplicate letters are handled correctly.
function scoreGuess(guess, target) {
  const result = Array(5).fill('absent')
  const targetLetters = target.split('')
  const used = Array(5).fill(false)

  for (let i = 0; i < 5; i++) {
    if (guess[i] === target[i]) {
      result[i] = 'correct'
      used[i] = true
    }
  }
  for (let i = 0; i < 5; i++) {
    if (result[i] === 'correct') continue
    const idx = targetLetters.findIndex((ch, j) => ch === guess[i] && !used[j])
    if (idx !== -1) {
      result[i] = 'present'
      used[idx] = true
    }
  }
  return result
}

function WordleGame() {
  const [target, setTarget] = useState(() => pickWord())
  const [guesses, setGuesses] = useState([]) // [{letters, scores}]
  const [current, setCurrent] = useState('')
  const [status, setStatus] = useState('playing') // playing | won | lost

  const keyStatus = {}
  for (const g of guesses) {
    g.letters.forEach((ch, i) => {
      const s = g.scores[i]
      const rank = { absent: 0, present: 1, correct: 2 }
      if (!(ch in keyStatus) || rank[s] > rank[keyStatus[ch]]) keyStatus[ch] = s
    })
  }

  function newGame() {
    setTarget((t) => pickWord(t))
    setGuesses([])
    setCurrent('')
    setStatus('playing')
  }

  function pressKey(key) {
    if (status !== 'playing') return
    if (key === 'ENTER') {
      if (current.length !== 5) return
      const scores = scoreGuess(current, target)
      const next = [...guesses, { letters: current.split(''), scores }]
      setGuesses(next)
      setCurrent('')
      if (current === target) setStatus('won')
      else if (next.length >= MAX_ATTEMPTS) setStatus('lost')
      return
    }
    if (key === 'BACK') {
      setCurrent((c) => c.slice(0, -1))
      return
    }
    if (current.length < 5) setCurrent((c) => c + key)
  }

  const rows = []
  for (let r = 0; r < MAX_ATTEMPTS; r++) {
    if (r < guesses.length) {
      rows.push(guesses[r])
    } else if (r === guesses.length) {
      rows.push({ letters: current.split(''), scores: [] })
    } else {
      rows.push({ letters: [], scores: [] })
    }
  }

  return (
    <div className="widget-card">
      <p className="prose wordle-intro">Guess the 5-letter word. Finance & football vocabulary only.</p>

      <div className="wordle-grid">
        {rows.map((row, r) => (
          <div className="wordle-row" key={r}>
            {Array.from({ length: 5 }).map((_, c) => {
              const letter = row.letters[c] || ''
              const score = row.scores[c]
              return (
                <span key={c} className={`wordle-cell${score ? ` wordle-${score}` : ''}${letter && !score ? ' wordle-filled' : ''}`}>
                  {letter}
                </span>
              )
            })}
          </div>
        ))}
      </div>

      <p className="caption">
        {status === 'won' && 'Solved it. 📈'}
        {status === 'lost' && `Out of guesses — it was ${target}.`}
        {status === 'playing' && `Attempt ${guesses.length + 1} of ${MAX_ATTEMPTS}`}
      </p>

      {status !== 'playing' ? (
        <button type="button" className="widget-btn" onClick={newGame}>
          New word
        </button>
      ) : (
        <div className="wordle-keyboard">
          {ROWS.map((row, i) => (
            <div className="wordle-key-row" key={i}>
              {i === 2 && (
                <button type="button" className="wordle-key wordle-key-wide" onClick={() => pressKey('ENTER')}>
                  Enter
                </button>
              )}
              {row.split('').map((k) => (
                <button
                  type="button"
                  key={k}
                  className={`wordle-key${keyStatus[k] ? ` wordle-${keyStatus[k]}` : ''}`}
                  onClick={() => pressKey(k)}
                >
                  {k}
                </button>
              ))}
              {i === 2 && (
                <button type="button" className="wordle-key wordle-key-wide" onClick={() => pressKey('BACK')}>
                  ⌫
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default WordleGame
