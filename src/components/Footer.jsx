import { GitHubIcon, LinkedInIcon, InstagramIcon, TwitterIcon, MailIcon } from './SocialIcons.jsx'

const socials = [
  { label: 'GitHub', href: 'https://github.com/yash786876', Icon: GitHubIcon },
  { label: 'LinkedIn', href: '#', Icon: LinkedInIcon },
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
  { label: 'Twitter', href: '#', Icon: TwitterIcon },
  { label: 'Email', href: 'mailto:you@example.com', Icon: MailIcon },
]

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
