import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PenaltyShootout from '../components/PenaltyShootout.jsx'
import ScribbleChart from '../components/ScribbleChart.jsx'
import BullBearReflex from '../components/BullBearReflex.jsx'
import WhackABuzzword from '../components/WhackABuzzword.jsx'
import DogHouse from '../components/DogHouse.jsx'
import DealTicker from '../components/DealTicker.jsx'

const tiles = [
  { to: '/about', emoji: '🌱', title: 'About Me', blurb: 'My story & background.', tone: 'green' },
  { to: '/apps', emoji: '🛠️', title: 'Apps I Built', blurb: "Things I've shipped.", tone: 'blue' },
  { to: '/finance-geek', emoji: '📈', title: 'Finance Geek', blurb: 'IB/PE reading & takes.', tone: 'amber' },
  { to: '/deep-tech', emoji: '🧠', title: 'Deep Tech', blurb: 'Tech that moves things.', tone: 'purple' },
  { to: '/movies', emoji: '🎬', title: 'Movies', blurb: "Won't shut up about these.", tone: 'red' },
  { to: '/books', emoji: '📚', title: 'Books', blurb: 'What changed my mind.', tone: 'teal' },
]

const CLICK_WINDOW = 1500
const CLICKS_NEEDED = 5

function Home() {
  const [costume, setCostume] = useState('suit')
  const clickTimes = useRef([])

  function onAvatarClick() {
    const now = Date.now()
    clickTimes.current = [...clickTimes.current, now].filter((t) => now - t < CLICK_WINDOW)
    if (clickTimes.current.length >= CLICKS_NEEDED) {
      clickTimes.current = []
      setCostume((c) => (c === 'suit' ? 'kit' : 'suit'))
    }
  }

  return (
    <>
      <header className="hero">
        <button
          type="button"
          className="hero-avatar"
          key={costume}
          onClick={onAvatarClick}
          aria-label="Click me 5 times fast"
          title="click me 5x fast"
        >
          {costume === 'suit' ? 'Y' : '⚽'}
        </button>
        <h1>👋 Hey, I'm Yash</h1>
        <p className="tagline">jack of all trades · finance geek · footballer at heart</p>
      </header>

      <DealTicker />

      <h2 className="section-label">Play around</h2>
      <div className="widget-grid">
        <DogHouse />
        <PenaltyShootout />
        <BullBearReflex />
        <WhackABuzzword />
        <ScribbleChart />
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
