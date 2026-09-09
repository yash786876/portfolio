const socials = [
  { label: 'GitHub', href: 'https://github.com/yash786876' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Email', href: 'mailto:you@example.com' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="socials">
        {socials.map((s) => (
          <a href={s.href} key={s.label} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
      </div>
      <p>Built by Yash Santwani.</p>
    </footer>
  )
}

export default Footer
