import { Link } from 'react-router-dom'
import PenaltyShootout from '../components/PenaltyShootout.jsx'
import ChessWidget from '../components/ChessWidget.jsx'
import WordleGame from '../components/WordleGame.jsx'
import SimonGame from '../components/SimonGame.jsx'
import DealTicker from '../components/DealTicker.jsx'

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
        <h1>👋 Hey, I'm Yash</h1>
        <p className="tagline">jack of all trades · finance geek · footballer at heart</p>
      </header>

      <DealTicker />

      <h2 className="section-label">Play around</h2>
      <div className="widget-grid">
        <ChessWidget />
        <PenaltyShootout />
        <WordleGame />
        <SimonGame />
      </div>

      <h2 className="section-label">Explore</h2>
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
