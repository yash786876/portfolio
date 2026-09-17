import DeepTechFeed from '../components/DeepTechFeed.jsx'

function TopicPage({ title, intro, bullets, domainKey }) {
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

      {domainKey && (
        <>
          <h2 style={{ marginTop: '32px' }}>Today's Buzz</h2>
          <p className="prose">Auto-updated daily from Hacker News and space-news sources.</p>
          <DeepTechFeed domainKey={domainKey} />
        </>
      )}
    </section>
  )
}

export default TopicPage
