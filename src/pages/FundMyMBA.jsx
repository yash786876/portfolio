import { useState } from 'react'
import './FundMyMBA.css'

// TODO: replace with your real UPI ID once you send it over
const UPI_ID = 'yourname@upi'
// TODO: drop your real QR export in src/assets/ and swap this in
const QR_IMAGE = null

const tiers = [
  {
    name: 'Shoutout Sponsor',
    price: 500,
    perk: "A dedicated Instagram + LinkedIn story bragging about your company. Tagged, not just mentioned.",
  },
  {
    name: 'T-Shirt Sponsor',
    price: 1500,
    perk: 'Your name/logo on a t-shirt I actually wear, plus photo proof posted. Everything above included.',
    highlight: true,
  },
  {
    name: 'Bag Sponsor',
    price: 3000,
    perk: 'Your name/logo on my everyday bag — the one that goes to every case comp and interview. Everything above included.',
  },
  {
    name: 'Title Sponsor',
    price: 10000,
    perk: "A dedicated post making the case for why your company is the reason I made it to b-school. Everything above included.",
  },
]

const backers = [
  { name: 'Placeholder Backer', amount: '₹1,000' },
  { name: 'Placeholder Backer', amount: '₹500' },
  { name: 'Placeholder Backer', amount: '₹250' },
]

function reactionFor(amount) {
  if (amount < 300) return "That's a chai. I appreciate the chai. ☕"
  if (amount < 1000) return "Solid. You're basically part of the syndicate now."
  if (amount < 3000) return 'Okay now you\'re getting a shoutout AND a shirt cameo. 👕'
  if (amount < 8000) return 'Certified MBA angel investor behavior. 📈'
  return "Are you hiring? Because I am extremely available. 👀"
}

function tierForAmount(amount) {
  let unlocked = null
  for (const t of tiers) {
    if (amount >= t.price) unlocked = t
  }
  return unlocked
}

function formatINR(n) {
  return `₹${n.toLocaleString('en-IN')}`
}

function FundMyMBA() {
  const [amount, setAmount] = useState(1500)
  const [copied, setCopied] = useState(false)
  const unlocked = tierForAmount(amount)

  async function copyUpi() {
    try {
      await navigator.clipboard.writeText(UPI_ID)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard not available — the ID is still selectable text
    }
  }

  return (
    <section className="page mba-page">
      <header className="mba-hero">
        <p className="mba-eyebrow">A completely reasonable ask</p>
        <h1>Come Fund My MBA</h1>
        <p className="mba-tagline">
          One finance geek, one dream b-school, zero tuition budget.
        </p>
        <a className="mba-cta" href="#sponsor">Become a Sponsor →</a>
      </header>

      <div className="mba-photos">
        {[1, 2, 3].map((i) => (
          <div className="mba-photo-slot" key={i}>
            <span>📷</span>
            <p>Add photo {i}</p>
          </div>
        ))}
      </div>

      <div className="mba-story widget-card">
        <h2>The pitch</h2>
        <p className="prose">
          Replace this with your real story: which programs you're targeting,
          why an MBA, and why now. Keep the tone self-aware — this works
          because it doesn't take itself too seriously, even though the
          tuition bill absolutely will.
        </p>
      </div>

      <div id="sponsor" className="mba-slider widget-card">
        <h2>Pick your damage</h2>
        <p className="prose">Drag to any amount — see what it unlocks in real time.</p>

        <div className="mba-slider-amount">{formatINR(amount)}</div>
        <input
          type="range"
          min={100}
          max={10000}
          step={100}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mba-range"
        />
        <p className="caption">{reactionFor(amount)}</p>
        {unlocked && (
          <p className="mba-unlock">
            Unlocks: <strong>{unlocked.name}</strong>
          </p>
        )}

        <div className="mba-pay-box">
          <div className="mba-qr">
            {QR_IMAGE ? (
              <img src={QR_IMAGE} alt="UPI QR code" />
            ) : (
              <div className="mba-qr-placeholder">
                <span>▦</span>
                <p>QR code coming soon</p>
              </div>
            )}
          </div>
          <div className="mba-upi">
            <span className="mba-upi-label">UPI ID</span>
            <div className="mba-upi-row">
              <code>{UPI_ID}</code>
              <button type="button" className="widget-btn" onClick={copyUpi}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="mba-upi-note">
              Any amount, any time — the slider's just for fun. Screenshot your
              payment and DM it over so you land on the wall below.
            </p>
          </div>
        </div>
      </div>

      <div className="mba-breakdown widget-card">
        <h2>Where the money actually goes</h2>
        <ul className="posts">
          <li><span className="post-title">Tuition</span><span className="post-date">Placeholder ₹₹₹</span></li>
          <li><span className="post-title">Rent, because b-school cities aren't cheap</span><span className="post-date">Placeholder ₹₹₹</span></li>
          <li><span className="post-title">Case competition snacks</span><span className="post-date">Placeholder ₹₹₹</span></li>
          <li><span className="post-title">Emotional damage (GMAT prep)</span><span className="post-date">Priceless</span></li>
        </ul>
      </div>

      <div className="mba-tiers">
        <h2>Sponsorship tiers</h2>
        <div className="grid">
          {tiers.map((t) => (
            <button
              type="button"
              className={`tier tier-btn${t.highlight ? ' tier-highlight' : ''}${unlocked?.name === t.name ? ' tier-active' : ''}`}
              key={t.name}
              onClick={() => setAmount(t.price)}
            >
              <h3>{t.name}</h3>
              <p className="tier-price">{formatINR(t.price)}</p>
              <p className="tier-perk">{t.perk}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mba-leaderboard widget-card">
        <h2>Thank-you wall</h2>
        <p className="prose">Updated by hand as real sponsors come in — not live-tracked (this is a static site).</p>
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
          you would anywhere else on this site, or DM on Instagram/LinkedIn.
        </p>
      </div>
    </section>
  )
}

export default FundMyMBA
