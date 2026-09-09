function TopicPage({ title, intro, bullets }) {
  return (
    <section className="page">
      <h1>{title}</h1>
      <p className="prose">{intro}</p>
      <ul className="posts">
        {bullets.map((b, i) => (
          <li key={i}>
            <span className="post-title">{b.label}</span>
            <span className="post-date">{b.note}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TopicPage
