import { Link } from 'react-router-dom'

const cards = [
  { to: '/about', emoji: '🌱', title: 'About Me', blurb: 'My story, background, and how I got here.' },
  { to: '/apps', emoji: '🛠️', title: 'Apps I Built', blurb: "Things I've shipped — projects and experiments." },
  { to: '/finance-geek', emoji: '📈', title: 'Finance Geek', blurb: 'IB/PE reading, models, and market rambles.' },
  { to: '/deep-tech', emoji: '🧠', title: 'The World of Deep Tech', blurb: 'Notes on the tech that actually moves things.' },
  { to: '/movies', emoji: '🎬', title: 'Movie Recommendations', blurb: "Stuff I've watched and won't shut up about." },
  { to: '/books', emoji: '📚', title: 'Books Recommendations', blurb: 'What I\'m reading and what changed my mind.' },
  { to: '/sports', emoji: '⚽', title: 'Sports', blurb: 'Football, and an interactive ball worth kicking.' },
]

function Home() {
  return (
    <>
      <header className="hero">
        <div className="hero-avatar" aria-hidden="true">Y</div>
        <h1>👋 Hey, I'm Yash</h1>
        <p className="tagline">jack of all trades · finance geek · footballer at heart</p>
        <p className="hero-sub">
          This is my little corner of the internet — what I've built, what I'm
          reading, and what I'm into when I'm not doing any of that.
        </p>
      </header>

      <nav className="cards" aria-label="Sections">
        {cards.map((c) => (
          <Link className="card" to={c.to} key={c.to}>
            <span className="card-emoji">{c.emoji}</span>
            <span className="card-title">{c.title}</span>
            <span className="card-blurb">{c.blurb}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}

export default Home
