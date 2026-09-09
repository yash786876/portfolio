const books = [
  { title: 'Placeholder Book One', note: 'What it changed for you, in one line.' },
  { title: 'Placeholder Book Two', note: 'What it changed for you, in one line.' },
  { title: 'Placeholder Book Three', note: 'What it changed for you, in one line.' },
]

function BooksRecommendations() {
  return (
    <section className="page">
      <h1>Books Recommendations</h1>
      <p className="prose">What I'm reading and what changed my mind — replace with your real list.</p>
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
