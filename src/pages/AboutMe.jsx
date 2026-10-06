function AboutMe() {
  return (
    <section className="page">
      <h1>About Me</h1>

      <a
        className="cta-btn"
        href={`${import.meta.env.BASE_URL}Yash_Santwani_Resume.pdf`}
        target="_blank"
        rel="noreferrer"
        style={{ marginBottom: '28px' }}
      >
        Download Resume →
      </a>

      <p className="prose">
        I'm a founder and analyst who builds businesses and reads numbers.
        I took a food business, Shubhrashi (Malava Food Industries), from ₹0
        to ₹8 Cr in revenue in 24 months — owning GTM strategy, a 19-member
        team, and relationships across 76 B2B clients and 2,500+ retail
        counters. Before that, I was at ZS Associates, where I worked on data
        pipelines and campaign personalization for Fortune 500 clients
        reaching 20M+ customers.
      </p>
      <p className="prose">
        Right now I'm doing a PGP in Technology & Business Management at
        Masters' Union, and I'm a core member of the Masters' Union Venture
        Fund. I'm working toward investment banking / private capital next —
        this site's "Finance Geek" section is where that shows up. Off the
        spreadsheet, I play football: I captained my university team at the
        All India Nationals and represented my district across multiple age
        groups growing up.
      </p>
    </section>
  )
}

export default AboutMe
