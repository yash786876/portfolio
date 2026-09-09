const reads = [
  { title: 'Placeholder: a deal / memo / paper worth reading', note: 'Why it stuck with you.' },
  { title: 'Placeholder: a company you\'ve been digging into', note: 'One line on the thesis.' },
]

function FinanceGeek() {
  return (
    <section className="page">
      <h1>Finance Geek</h1>
      <p className="prose">
        Working toward investment banking / private capital. This is the shelf
        for models, memos, market takes, and the occasional hot take on a
        deal — replace with your real reading list and notes.
      </p>
      <ul className="posts">
        {reads.map((r, i) => (
          <li key={i}>
            <span className="post-title">{r.title}</span>
            <span className="post-date">{r.note}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default FinanceGeek
