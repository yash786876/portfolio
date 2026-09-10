import { socials } from '../socialsData.js'

function Footer() {
  return (
    <footer className="footer">
      <div className="socials">
        {socials.map(({ label, href, Icon }) => (
          <a href={href} key={label} target="_blank" rel="noreferrer" className="social-icon" aria-label={label} title={label}>
            <Icon />
          </a>
        ))}
      </div>
      <p>Built by Yash Santwani.</p>
    </footer>
  )
}

export default Footer
