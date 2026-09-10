import './BooksRecommendations.css'

const TARGET_YEAR = 2026
const TARGET_BOOKS = 25
// TODO: bump this up as you actually finish books this year
const BOOKS_READ = 0

const books = [
  { title: 'Placeholder Book One', note: 'What it changed for you, in one line.' },
  { title: 'Placeholder Book Two', note: 'What it changed for you, in one line.' },
  { title: 'Placeholder Book Three', note: 'What it changed for you, in one line.' },
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
    </section>
  )
}

export default BooksRecommendations
