import './FundMyMBA.css'

const tiers = [
  {
    name: 'Coffee Sponsor',
    price: '$10',
    perk: "You'll be thanked by name in a caffeinated 2am study post.",
  },
  {
    name: 'Case Study Hero',
    price: '$50',
    perk: 'Your name on the "people who believed in me" slide. There is a slide.',
    highlight: true,
  },
  {
    name: 'Tuition Legend',
    price: '$500',
    perk: 'Logo on my laptop, a LinkedIn shoutout, and eternal gratitude at reunion.',
  },
]

const backers = [
  { name: 'Placeholder Backer', amount: '$100' },
  { name: 'Placeholder Backer', amount: '$50' },
  { name: 'Placeholder Backer', amount: '$25' },
]

function FundMyMBA() {
  return (
    <section className="page mba-page">
      <header className="mba-hero">
        <p className="mba-eyebrow">A completely reasonable ask</p>
        <h1>Come Fund My MBA</h1>
        <p className="mba-tagline">
          One finance geek, one dream b-school, zero tuition budget.
        </p>
        <a className="mba-cta" href="#tiers">Become a Sponsor →</a>
      </header>

      <div className="mba-story widget-card">
        <h2>The pitch</h2>
        <p className="prose">
          Replace this with your real story: which programs you're targeting,
          why an MBA, and why now. Keep the tone self-aware — this works
          because it doesn't take itself too seriously, even though the
          tuition bill absolutely will.
        </p>
      </div>

      <div className="mba-breakdown widget-card">
        <h2>Where the money actually goes</h2>
        <ul className="posts">
          <li><span className="post-title">Tuition</span><span className="post-date">Placeholder $$$</span></li>
          <li><span className="post-title">Rent, because b-school cities aren't cheap</span><span className="post-date">Placeholder $$$</span></li>
          <li><span className="post-title">Case competition snacks</span><span className="post-date">Placeholder $$$</span></li>
          <li><span className="post-title">Emotional damage (GMAT prep)</span><span className="post-date">Priceless</span></li>
        </ul>
      </div>

      <div id="tiers" className="mba-tiers">
        <h2>Sponsorship tiers</h2>
        <div className="grid">
          {tiers.map((t) => (
            <div className={`tier${t.highlight ? ' tier-highlight' : ''}`} key={t.name}>
              <h3>{t.name}</h3>
              <p className="tier-price">{t.price}</p>
              <p className="tier-perk">{t.perk}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mba-leaderboard widget-card">
        <h2>Leaderboard</h2>
        <ul className="posts">
          {backers.map((b, i) => (
            <li key={i}>
              <span className="post-title">#{i + 1} {b.name}</span>
              <span className="post-date">{b.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mba-contact">
        <h2>Contact</h2>
        <p className="prose">
          Questions, pledges, or just moral support — reach out the same way
          you would anywhere else on this site.
        </p>
      </div>
    </section>
  )
}

export default FundMyMBA
