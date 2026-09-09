import { useEffect, useRef, useState } from 'react'
import './Mascot.css'

const TEASE_THRESHOLD = 5

const IDLE_LINES = [
  '*chews on your resume*',
  "I buried your motivation. Somewhere. I forget where.",
  'Zoomies incoming in 3… 2…',
  "I'm not judging your code. I am, actually.",
  'Pet me and I might debug your life. No promises.',
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

function Mascot() {
  const [phase, setPhase] = useState('idle') // idle | teased | challenge | correct | wrong
  const [teaseCount, setTeaseCount] = useState(0)
  const [message, setMessage] = useState(pick(IDLE_LINES))
  const [question, setQuestion] = useState(null)
  const [answerInput, setAnswerInput] = useState('')
  const phaseRef = useRef(phase)
  const resetTimer = useRef(null)

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    const id = setInterval(() => {
      if (phaseRef.current === 'idle') {
        setMessage(pick(IDLE_LINES))
      }
    }, 6000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  function tease() {
    if (phase === 'challenge') return
    if (phase !== 'idle' && phase !== 'teased') {
      // reset from correct/wrong back into play
      setPhase('idle')
    }
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
    resetTimer.current = setTimeout(() => {
      setPhase('idle')
      setMessage(pick(IDLE_LINES))
    }, 3200)
  }

  const emoji =
    phase === 'challenge' ? '🤓' : phase === 'wrong' ? '🤣' : phase === 'correct' ? '🙄' : phase === 'teased' ? '😤' : '🐶'

  return (
    <div className={`mascot-wrap mascot-${phase}`}>
      <div className="mascot-bubble">
        {phase === 'challenge' && question ? (
          <form onSubmit={submitAnswer} className="mascot-form">
            <p>{message}</p>
            <p className="mascot-question">{question.text} = ?</p>
            <div className="mascot-answer-row">
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
      <button
        type="button"
        className="mascot-avatar"
        onClick={tease}
        aria-label="Tease the mascot"
        title="tease me, I dare you"
      >
        {emoji}
      </button>
    </div>
  )
}

export default Mascot
