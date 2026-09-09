const movies = [
  { title: 'Placeholder Movie One', note: 'Why you love it, in one line.' },
  { title: 'Placeholder Movie Two', note: 'Why you love it, in one line.' },
  { title: 'Placeholder Movie Three', note: 'Why you love it, in one line.' },
]

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
    </section>
  )
}

export default MovieRecommendations
