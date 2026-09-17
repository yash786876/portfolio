import ExpandableTopic from '../components/ExpandableTopic.jsx'
import DeepTechFeed from '../components/DeepTechFeed.jsx'

function TopicPage({ title, intro, bullets, domainKey }) {
  return (
    <section className="page">
      <h1>{title}</h1>
      <p className="prose">{intro}</p>

      <h2 style={{ marginTop: '24px' }}>The Fundamentals</h2>
      <p className="prose">Tap a topic for the full explanation and a diagram.</p>
      {bullets.map((b, i) => (
        <ExpandableTopic key={i} {...b} />
      ))}

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
