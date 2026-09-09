import { Link } from 'react-router-dom'
import KickableBall from '../components/KickableBall.jsx'

const tiles = [
  { to: '/about', emoji: '🌱', title: 'About Me', blurb: 'My story & background.', tone: 'green' },
  { to: '/apps', emoji: '🛠️', title: 'Apps I Built', blurb: "Things I've shipped.", tone: 'blue' },
  { to: '/finance-geek', emoji: '📈', title: 'Finance Geek', blurb: 'IB/PE reading & takes.', tone: 'amber' },
  { to: '/deep-tech', emoji: '🧠', title: 'Deep Tech', blurb: 'Tech that moves things.', tone: 'purple' },
  { to: '/movies', emoji: '🎬', title: 'Movies', blurb: "Won't shut up about these.", tone: 'red' },
  { to: '/books', emoji: '📚', title: 'Books', blurb: 'What changed my mind.', tone: 'teal' },
]

function Home() {
  return (
    <>
      <header className="hero">
        <div className="hero-avatar" aria-hidden="true">Y</div>
        <h1>👋 Hey, I'm Yash</h1>
        <p className="tagline">jack of all trades · finance geek · footballer at heart</p>
      </header>

      <KickableBall />

      <div className="tile-grid">
        {tiles.map((t) => (
          <Link className={`tile tone-${t.tone}`} to={t.to} key={t.to}>
            <span className="tile-icon">{t.emoji}</span>
            <span className="tile-title">{t.title}</span>
            <span className="tile-blurb">{t.blurb}</span>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Home
