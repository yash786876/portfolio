import { useEffect, useState } from 'react'
import './ThemeToggle.css'

function getInitialTheme() {
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // ignore
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // ignore
    }
  }, [theme])

  function toggle() {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }

  return (
    <button
      type="button"
      className={`lamp-toggle${theme === 'dark' ? ' lamp-on' : ' lamp-off'}`}
      onClick={toggle}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title="pull the cord"
    >
      <span className="lamp-cord" aria-hidden="true" />
      <span className="lamp-shade" aria-hidden="true" />
      <span className="lamp-bulb" aria-hidden="true" />
    </button>
  )
}

export default ThemeToggle
