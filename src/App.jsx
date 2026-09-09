import './App.css'

const cards = [
  {
    id: 'projects',
    emoji: '🛠️',
    title: 'Projects',
    blurb: "Things I've built — apps, tools, and experiments.",
  },
  {
    id: 'about',
    emoji: '🌱',
    title: 'About',
    blurb: 'My story, background, and how I got here.',
  },
  {
    id: 'writing',
    emoji: '✍️',
    title: 'Writing',
    blurb: 'Notes, articles, and things worth remembering.',
  },
  {
    id: 'contact',
    emoji: '📬',
    title: 'Contact',
    blurb: "Let's talk — reach out or find me elsewhere.",
  },
]

const projects = [
  {
    name: 'Project One',
    desc: 'A short description of what this project does and why it matters.',
    link: '#',
    tags: ['React', 'Node'],
  },
  {
    name: 'Project Two',
    desc: 'A short description of what this project does and why it matters.',
    link: '#',
    tags: ['Python'],
  },
  {
    name: 'Project Three',
    desc: 'A short description of what this project does and why it matters.',
    link: '#',
    tags: ['TypeScript', 'API'],
  },
]

const posts = [
  { title: 'Placeholder post title', date: 'Draft' },
  { title: 'Placeholder post title', date: 'Draft' },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/yash786876' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Email', href: 'mailto:you@example.com' },
]

function App() {
  return (
    <>
      <header className="hero">
        <div className="hero-avatar" aria-hidden="true">Y</div>
        <h1>👋 Hey, I'm Yash</h1>
        <p className="tagline">developer · builder · curious learner</p>
        <p className="hero-sub">
          This is my little corner of the internet — projects I've made, things
          I'm learning, and ways to reach me.
        </p>
      </header>

      <nav className="cards" aria-label="Sections">
        {cards.map((c) => (
          <a className="card" href={`#${c.id}`} key={c.id}>
            <span className="card-emoji">{c.emoji}</span>
            <span className="card-title">{c.title}</span>
            <span className="card-blurb">{c.blurb}</span>
          </a>
        ))}
      </nav>

      <main>
        <section id="projects" className="section">
          <h2>Projects</h2>
          <div className="grid">
            {projects.map((p) => (
              <a className="project" href={p.link} key={p.name}>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="about" className="section">
          <h2>About</h2>
          <p className="prose">
            I'm Yash — replace this with a couple of real paragraphs about your
            background, what you're currently focused on, and what you care
            about. Keep it conversational, like you're telling a friend.
          </p>
        </section>

        <section id="writing" className="section">
          <h2>Writing</h2>
          <ul className="posts">
            {posts.map((p, i) => (
              <li key={i}>
                <span className="post-title">{p.title}</span>
                <span className="post-date">{p.date}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="section">
          <h2>Contact</h2>
          <p className="prose">Say hi — I'm always up for a good conversation.</p>
          <div className="socials">
            {socials.map((s) => (
              <a href={s.href} key={s.label} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Built by Yash Santwani.</p>
      </footer>
    </>
  )
}

export default App
