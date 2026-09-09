const notes = [
  { title: 'Placeholder: a deep tech topic you find fascinating', note: 'e.g. semiconductors, fusion, robotics' },
  { title: 'Placeholder: a paper or article that changed your view', note: 'One line on why.' },
]

function DeepTech() {
  return (
    <section className="page">
      <h1>The World of Deep Tech</h1>
      <p className="prose">
        Notes on the technology that actually moves things — swap in the real
        topics you're following (semiconductors, robotics, energy, whatever
        pulls you in).
      </p>
      <ul className="posts">
        {notes.map((n, i) => (
          <li key={i}>
            <span className="post-title">{n.title}</span>
            <span className="post-date">{n.note}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default DeepTech
