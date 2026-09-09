import { Link } from 'react-router-dom'

const reads = [
  { title: 'Placeholder: a deal / memo / paper worth reading', note: 'Why it stuck with you.' },
  { title: 'Placeholder: a company you\'ve been digging into', note: 'One line on the thesis.' },
]

const subPages = [
  { to: '/finance-geek/dcf-model', title: 'DCF Model', desc: 'Assumptions, WACC, terminal value, valuation range.' },
  { to: '/finance-geek/industry-analysis', title: 'Industry Analysis', desc: "Porter's Five Forces, TAM/SAM/SOM, positioning." },
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

      <div className="grid">
        {subPages.map((s) => (
          <Link className="project" to={s.to} key={s.to}>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </Link>
        ))}
      </div>

      <h2 style={{ marginTop: '32px' }}>Reading list</h2>
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
