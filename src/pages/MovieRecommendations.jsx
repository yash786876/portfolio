const movies = [
  { title: 'The Social Network', note: 'Builder energy, betrayal, and a soundtrack that hits different.' },
  { title: 'Moneyball', note: "Finance brain meets sports — data beats the eye test." },
  { title: 'The Dark Knight', note: 'The best villain performance in a superhero film, period.' },
  { title: 'Inception', note: 'A heist movie that rewards every rewatch.' },
  { title: 'Whiplash', note: 'Obsession, ambition, and the cost of "not quite my tempo."' },
  { title: 'Parasite', note: 'Class commentary disguised as a thriller. Flawless structure.' },
]

const dialogues = [
  { line: "I'm gonna make him an offer he can't refuse.", movie: 'The Godfather (1972)' },
  { line: 'Why so serious?', movie: 'The Dark Knight (2008)' },
  { line: 'May the Force be with you.', movie: 'Star Wars (1977)' },
  { line: "Here's looking at you, kid.", movie: 'Casablanca (1942)' },
  { line: "You can't handle the truth!", movie: 'A Few Good Men (1992)' },
  { line: 'Life is like a box of chocolates.', movie: 'Forrest Gump (1994)' },
  { line: 'I feel the need — the need for speed.', movie: 'Top Gun (1986)' },
]

const scenes = [
  { name: 'The lobby shootout', movie: 'The Matrix (1999)' },
  { name: 'The interrogation scene', movie: 'The Dark Knight (2008)' },
  { name: 'The opening heist', movie: 'Baby Driver (2017)' },
  { name: 'The ending twist', movie: 'The Sixth Sense (1999)' },
  { name: "Kabir Khan's team-selection speech", movie: 'Chak De! India (2007)' },
  { name: 'The final over', movie: 'Lagaan (2001)' },
]

function youtubeSearch(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
}

function MovieRecommendations() {
  return (
    <section className="page">
      <h1>Movie Recommendations</h1>
      <p className="prose">Stuff I've watched and won't shut up about — replace with your real list.</p>
      <ul className="posts">
        {movies.map((m, i) => (
          <li key={i}>
            <span className="post-title">{m.title}</span>
            <span className="post-date">{m.note}</span>
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: '32px' }}>Famous Dialogues</h2>
      <p className="prose">Lines that live rent-free.</p>
      <ul className="posts">
        {dialogues.map((d, i) => (
          <li key={i}>
            <span className="post-title">"{d.line}"</span>
            <span className="post-date">{d.movie}</span>
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: '32px' }}>Best Scenes</h2>
      <p className="prose">Worth pausing everything for. Links jump to a YouTube search for the clip.</p>
      <div className="grid">
        {scenes.map((s, i) => (
          <a className="project" href={youtubeSearch(`${s.name} ${s.movie} scene`)} target="_blank" rel="noreferrer" key={i}>
            <h3>🎬 {s.name}</h3>
            <p>{s.movie}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

export default MovieRecommendations
