import { Link } from 'react-router-dom'

const subPages = [
  { to: '/deep-tech/healthcare', emoji: '🩺', title: 'Healthcare', desc: 'Digital health, biotech, health-tech infrastructure.' },
  { to: '/deep-tech/computing', emoji: '💻', title: 'Computing', desc: 'Semiconductors, quantum, edge & cloud, AI hardware.' },
  { to: '/deep-tech/manufacturing', emoji: '🏭', title: 'Manufacturing', desc: 'Automation, additive manufacturing, smart factories.' },
  { to: '/deep-tech/new-innovation', emoji: '💡', title: 'New Innovation', desc: 'Whatever is early enough to still be interesting.' },
  { to: '/deep-tech/out-of-this-world', emoji: '🚀', title: 'Out of This World', desc: 'Space tech, satellites, commercial spaceflight.' },
]

function DeepTech() {
  return (
    <section className="page">
      <h1>The World of Deep Tech</h1>
      <p className="prose">
        Notes on the technology that actually moves things — pick a track
        below, swap in the real topics you're following.
      </p>
      <div className="grid">
        {subPages.map((s) => (
          <Link className="project" to={s.to} key={s.to}>
            <h3>{s.emoji} {s.title}</h3>
            <p>{s.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default DeepTech
