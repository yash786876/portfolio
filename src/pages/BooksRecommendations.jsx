import { useState } from 'react'
import './BooksRecommendations.css'

const TARGET_YEAR = 2026
const TARGET_BOOKS = 25
// TODO: bump this up as you actually finish books this year
const BOOKS_READ = 0

const books = [
  { title: 'The Intelligent Investor', note: 'Benjamin Graham — the value-investing bible.' },
  { title: 'Shoe Dog', note: "Phil Knight's Nike memoir. Builder chaos, honestly told." },
  { title: 'Zero to One', note: 'Peter Thiel on building something genuinely new.' },
  { title: 'Moneyball', note: 'Michael Lewis on data beating gut instinct in sports.' },
  { title: 'Atomic Habits', note: 'James Clear — small systems beat big goals.' },
]

const recommendationPool = [
  { title: 'Sapiens', author: 'Yuval Noah Harari', pitch: 'A whirlwind history of how we got here.' },
  { title: 'The Intelligent Investor', author: 'Benjamin Graham', pitch: 'Value investing, still undefeated.' },
  { title: 'Shoe Dog', author: 'Phil Knight', pitch: 'What building a company actually feels like.' },
  { title: 'Zero to One', author: 'Peter Thiel', pitch: 'Contrarian thinking on monopolies and progress.' },
  { title: 'Atomic Habits', author: 'James Clear', pitch: 'Systems over goals, one percent at a time.' },
  { title: 'Fooled by Randomness', author: 'Nassim Nicholas Taleb', pitch: 'Why luck looks like skill until it doesn\'t.' },
  { title: 'The Alchemist', author: 'Paulo Coelho', pitch: 'A short one that outstays its length.' },
  { title: 'Moneyball', author: 'Michael Lewis', pitch: 'Undervalued players, overvalued instincts.' },
  { title: '1984', author: 'George Orwell', pitch: 'Still the sharpest warning ever written.' },
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', pitch: 'Your brain, caught making mistakes.' },
]

const reviews = [
  { title: 'The Intelligent Investor', note: 'Your take, in a few lines.' },
  { title: 'Shoe Dog', note: 'Your take, in a few lines.' },
]

const famousLines = [
  { line: 'It was the best of times, it was the worst of times.', book: 'A Tale of Two Cities — Charles Dickens' },
  { line: 'Call me Ishmael.', book: 'Moby-Dick — Herman Melville' },
  { line: 'It is a truth universally acknowledged, that a single man in possession of a good fortune must be in want of a wife.', book: 'Pride and Prejudice — Jane Austen' },
  { line: 'All happy families are alike; each unhappy family is unhappy in its own way.', book: 'Anna Karenina — Leo Tolstoy' },
  { line: 'In a hole in the ground there lived a hobbit.', book: 'The Hobbit — J.R.R. Tolkien' },
  { line: 'It was a bright cold day in April, and the clocks were striking thirteen.', book: '1984 — George Orwell' },
]

const mustReads = [
  { title: 'Sapiens', author: 'Yuval Noah Harari' },
  { title: 'The Intelligent Investor', author: 'Benjamin Graham' },
  { title: 'Atomic Habits', author: 'James Clear' },
  { title: '1984', author: 'George Orwell' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { title: 'The Alchemist', author: 'Paulo Coelho' },
]

function paceMessage() {
  const now = new Date()
  if (now.getFullYear() < TARGET_YEAR) {
    return `Challenge starts Jan 1, ${TARGET_YEAR}.`
  }
  if (now.getFullYear() > TARGET_YEAR) {
    return BOOKS_READ >= TARGET_BOOKS
      ? `Challenge complete — ${BOOKS_READ}/${TARGET_BOOKS}.`
      : `${TARGET_YEAR} closed at ${BOOKS_READ}/${TARGET_BOOKS}.`
  }

  const start = new Date(TARGET_YEAR, 0, 1)
  const end = new Date(TARGET_YEAR, 11, 31)
  const totalDays = Math.round((end - start) / 86400000) + 1
  const daysElapsed = Math.round((now - start) / 86400000) + 1
  const expected = (daysElapsed / totalDays) * TARGET_BOOKS
  const diff = Math.round(BOOKS_READ - expected)

  if (diff > 0) return `${diff} book${diff === 1 ? '' : 's'} ahead of pace. 📈`
  if (diff < 0) return `${Math.abs(diff)} book${Math.abs(diff) === 1 ? '' : 's'} behind pace — plenty of runway left.`
  return "Right on pace. Textbook execution."
}

function BooksRecommendations() {
  const pct = Math.min(100, Math.round((BOOKS_READ / TARGET_BOOKS) * 100))
  const [pick, setPick] = useState(null)

  function recommend() {
    let next = recommendationPool[Math.floor(Math.random() * recommendationPool.length)]
    if (pick && recommendationPool.length > 1) {
      while (next.title === pick.title) {
        next = recommendationPool[Math.floor(Math.random() * recommendationPool.length)]
      }
    }
    setPick(next)
  }

  return (
    <section className="page">
      <h1>Books Recommendations</h1>
      <p className="prose">What I'm reading and what changed my mind — replace with your real list.</p>

      <div className="widget-card books-challenge">
        <h2>{TARGET_YEAR} Reading Challenge</h2>
        <div className="books-progress-row">
          <span className="books-count">{BOOKS_READ}</span>
          <span className="books-of">of {TARGET_BOOKS} books</span>
        </div>
        <div className="books-bar">
          <div className="books-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="caption">{pct}% · {paceMessage()}</p>
      </div>

      <ul className="posts">
        {books.map((b, i) => (
          <li key={i}>
            <span className="post-title">{b.title}</span>
            <span className="post-date">{b.note}</span>
          </li>
        ))}
      </ul>

      <div className="widget-card books-recommend">
        <h2>Send Me a Book</h2>
        <p className="prose">Can't decide what to read next? Click for a recommendation.</p>
        <button type="button" className="widget-btn" onClick={recommend}>
          🎲 Recommend me a book
        </button>
        {pick && (
          <div className="books-pick">
            <p className="books-pick-title">{pick.title}</p>
            <p className="books-pick-author">{pick.author}</p>
            <p className="caption">{pick.pitch}</p>
          </div>
        )}
      </div>

      <h2 style={{ marginTop: '32px' }}>Book Reviews</h2>
      <ul className="posts">
        {reviews.map((r, i) => (
          <li key={i}>
            <span className="post-title">{r.title}</span>
            <span className="post-date">{r.note}</span>
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: '32px' }}>Famous Book Lines</h2>
      <ul className="posts">
        {famousLines.map((f, i) => (
          <li key={i}>
            <span className="post-title">"{f.line}"</span>
            <span className="post-date">{f.book}</span>
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: '32px' }}>The Must-Reads</h2>
      <div className="grid">
        {mustReads.map((m, i) => (
          <div className="project" key={i}>
            <h3>{m.title}</h3>
            <p>{m.author}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BooksRecommendations
