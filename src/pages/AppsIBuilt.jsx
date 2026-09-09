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

function AppsIBuilt() {
  return (
    <section className="page">
      <h1>Apps I Built</h1>
      <p className="prose">Things I've shipped — swap these placeholders for the real thing.</p>
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
  )
}

export default AppsIBuilt
