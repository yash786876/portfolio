import Accordion from '../components/Accordion.jsx'

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

      <Accordion title="1. DCF Model" defaultOpen>
        <p className="prose">
          Drop in your own DCF walkthrough here — assumptions, WACC, terminal
          value approach, and a link to the actual model. A rough skeleton:
        </p>
        <ul className="posts">
          <li><span className="post-title">Revenue growth assumptions</span><span className="post-date">Placeholder</span></li>
          <li><span className="post-title">WACC / discount rate</span><span className="post-date">Placeholder</span></li>
          <li><span className="post-title">Terminal value method</span><span className="post-date">Gordon growth / exit multiple</span></li>
          <li><span className="post-title">Implied valuation range</span><span className="post-date">Placeholder</span></li>
        </ul>
      </Accordion>

      <Accordion title="2. Industry Analysis">
        <p className="prose">
          A framework for breaking down any industry you're studying — swap
          in the real sector and findings.
        </p>
        <ul className="posts">
          <li><span className="post-title">Porter's Five Forces read</span><span className="post-date">Placeholder</span></li>
          <li><span className="post-title">TAM / SAM / SOM</span><span className="post-date">Placeholder</span></li>
          <li><span className="post-title">Key players & positioning</span><span className="post-date">Placeholder</span></li>
          <li><span className="post-title">Tailwinds / headwinds</span><span className="post-date">Placeholder</span></li>
        </ul>
      </Accordion>

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
