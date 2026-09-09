import { useEffect, useRef, useState } from 'react'
import './DogHouse.css'

const TEASE_THRESHOLD = 5

const IDLE_LINES = [
  '*chews on your resume*',
  "I buried your motivation. Somewhere. I forget where.",
  'Zoomies incoming in 3… 2…',
  "I'm not judging your code. I am, actually.",
  'Woof. That means "diversify your portfolio," probably.',
]

const TEASE_LINES = [
  'Hey. Personal space.',
  "Okay, that's twice now.",
  "I'm warning you.",
  'One more time. I dare you.',
]

const CHALLENGE_INTRO = [
  'Fine. You want chaos? Solve this.',
  'Since you love bothering me — math time.',
  "Let's see your \"finance brain\" handle this.",
]

const CORRECT_LINES = [
  "Ugh. Fine. You're not completely useless.",
  '…lucky guess.',
  'Okay that was actually right. Rude.',
]

const FEED_LINES = [
  '*inhales the treat* More.',
  "Best financial decision you've made all week.",
  'Bone acquired. Portfolio diversified.',
  'Worth the bell-ringing. Barely.',
]

const PLAY_LINES = [
  '*catches it mid-air* Show-off.',
  'Fetch complete. Invoice pending.',
  'I ran. You watched. Balanced relationship.',
  "That was fun. Don't tell anyone I said that.",
]

function wrongLine(answer) {
  const lines = [
    `🤣 WRONG. It was ${answer}. Even I know that, and I'm a dog.`,
    `Not even close. It's ${answer}. I've buried bones with better math skills.`,
    `${answer}. That's the answer. Try using your fingers.`,
  ]
  return lines[Math.floor(Math.random() * lines.length)]
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function makeQuestion() {
  const kind = Math.floor(Math.random() * 3)
  if (kind === 0) {
    const a = 12 + Math.floor(Math.random() * 8)
    const b = 6 + Math.floor(Math.random() * 9)
    return { text: `${a} × ${b}`, answer: a * b }
  }
  if (kind === 1) {
    const a = 10 + Math.floor(Math.random() * 90)
    const b = 10 + Math.floor(Math.random() * 90)
    const c = 5 + Math.floor(Math.random() * 40)
    return { text: `${a} + ${b} − ${c}`, answer: a + b - c }
  }
  const a = 11 + Math.floor(Math.random() * 9)
  return { text: `${a}²`, answer: a * a }
}

const FACES = {
  idle: '🐶',
  teased: '😤',
  challenge: '🤓',
  wrong: '🤣',
  correct: '🙄',
  fed: '😋',
  played: '😛',
}

function DogHouse() {
  const [doorState, setDoorState] = useState('in') // in | out
  const [phase, setPhase] = useState('idle')
  const [teaseCount, setTeaseCount] = useState(0)
  const [message, setMessage] = useState("He's inside. Ring the bell.")
  const [question, setQuestion] = useState(null)
  const [answerInput, setAnswerInput] = useState('')
  const [treats, setTreats] = useState(0)
  const [fetches, setFetches] = useState(0)
  const phaseRef = useRef(phase)
  const resetTimer = useRef(null)

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    const id = setInterval(() => {
      if (phaseRef.current === 'idle' && doorState === 'out') {
        setMessage(pick(IDLE_LINES))
      }
    }, 6000)
    return () => clearInterval(id)
  }, [doorState])

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  function ring() {
    if (doorState === 'out') return
    setDoorState('out')
    setPhase('idle')
    setMessage(pick(IDLE_LINES))
  }

  function sendHome() {
    if (phase === 'challenge') return
    setDoorState('in')
    setPhase('idle')
    setTeaseCount(0)
    setMessage("He's inside. Ring the bell.")
  }

  function feed() {
    if (phase === 'challenge') return
    setPhase('fed')
    setTreats((t) => t + 1)
    setMessage(pick(FEED_LINES))
    scheduleReset()
  }

  function play() {
    if (phase === 'challenge') return
    setPhase('played')
    setFetches((f) => f + 1)
    setMessage(pick(PLAY_LINES))
    scheduleReset()
  }

  function tease() {
    if (phase === 'challenge') return
    const next = teaseCount + 1
    if (next >= TEASE_THRESHOLD) {
      setTeaseCount(0)
      setQuestion(makeQuestion())
      setAnswerInput('')
      setMessage(pick(CHALLENGE_INTRO))
      setPhase('challenge')
    } else {
      setTeaseCount(next)
      setMessage(TEASE_LINES[next - 1])
      setPhase('teased')
    }
  }

  function scheduleReset() {
    clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => {
      setPhase('idle')
      setMessage(pick(IDLE_LINES))
    }, 2200)
  }

  function submitAnswer(e) {
    e.preventDefault()
    if (!question) return
    const correct = Number(answerInput) === question.answer
    if (correct) {
      setMessage(pick(CORRECT_LINES))
      setPhase('correct')
    } else {
      setMessage(wrongLine(question.answer))
      setPhase('wrong')
    }
    setQuestion(null)
    scheduleReset()
  }

  return (
    <div className="widget-card">
      <div className="stat-row">
        <div className="stat">
          <span className="stat-value">{treats}</span>
          <span className="stat-label">Treats given</span>
        </div>
        <div className="stat">
          <span className="stat-value">{fetches}</span>
          <span className="stat-label">Fetches</span>
        </div>
        <div className="stat">
          <span className="stat-value">{TEASE_THRESHOLD - teaseCount}</span>
          <span className="stat-label">His patience left</span>
        </div>
      </div>

      <div className={`doghouse-scene dog-${doorState} phase-${phase}`}>
        <div className="house">
          <div className="house-roof" />
          <div className="house-body">
            <div className="house-door" />
          </div>
        </div>

        {doorState === 'out' && (
          <>
            <div className="dog-bubble">
              {phase === 'challenge' && question ? (
                <form onSubmit={submitAnswer} className="dog-form">
                  <p>{message}</p>
                  <p className="dog-question">{question.text} = ?</p>
                  <div className="dog-answer-row">
                    <input
                      type="number"
                      value={answerInput}
                      onChange={(e) => setAnswerInput(e.target.value)}
                      autoFocus
                      aria-label="Your answer"
                    />
                    <button type="submit">Answer</button>
                  </div>
                </form>
              ) : (
                <p>{message}</p>
              )}
            </div>
            <div className="dog-sprite">{FACES[phase]}</div>
          </>
        )}
      </div>

      <div className="doghouse-actions">
        {doorState === 'in' && (
          <button type="button" className="dog-btn dog-btn-bell" onClick={ring}>
            🔔 Ring the bell
          </button>
        )}
        {doorState === 'out' && phase !== 'challenge' && (
          <>
            <button type="button" className="dog-btn" onClick={feed}>
              🦴 Feed
            </button>
            <button type="button" className="dog-btn" onClick={play}>
              🎾 Play
            </button>
            <button type="button" className="dog-btn dog-btn-tease" onClick={tease}>
              😈 Irritate
            </button>
            <button type="button" className="dog-btn dog-btn-ghost" onClick={sendHome}>
              🏠 Home
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default DogHouse
