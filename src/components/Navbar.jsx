import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'
import './Navbar.css'

const navItems = [
  {
    type: 'dropdown',
    key: 'finance',
    label: 'Finance Geek',
    basePath: '/finance-geek',
    items: [
      { to: '/finance-geek', label: 'Overview' },
      { to: '/finance-geek/dcf-model', label: 'DCF Model' },
      { to: '/finance-geek/industry-analysis', label: 'Industry Analysis' },
    ],
  },
  { type: 'link', to: '/fund-my-mba', label: 'Fund My MBA' },
  { type: 'link', to: '/about', label: 'About Me' },
  { type: 'link', to: '/apps', label: 'Apps I Built' },
  {
    type: 'dropdown',
    key: 'deep-tech',
    label: 'Deep Tech',
    basePath: '/deep-tech',
    items: [
      { to: '/deep-tech', label: 'Overview' },
      { to: '/deep-tech/healthcare', label: 'Healthcare' },
      { to: '/deep-tech/computing', label: 'Computing' },
      { to: '/deep-tech/manufacturing', label: 'Manufacturing' },
      { to: '/deep-tech/new-innovation', label: 'New Innovation' },
      { to: '/deep-tech/out-of-this-world', label: 'Out of This World' },
    ],
  },
  { type: 'link', to: '/movies', label: 'Movies' },
  { type: 'link', to: '/books', label: 'Books' },
]

function Navbar() {
  const [openKey, setOpenKey] = useState(null)
  const ref = useRef(null)
  const location = useLocation()

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpenKey(null)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div className="navbar" ref={ref}>
      <NavLink to="/" className="brand" end>
        Dashboard
      </NavLink>
      <ul className="nav-links">
        {navItems.map((item) => {
          if (item.type === 'link') {
            return (
              <li key={item.to}>
                <NavLink to={item.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                  {item.label}
                </NavLink>
              </li>
            )
          }
          const isActive = location.pathname.startsWith(item.basePath)
          const isOpen = openKey === item.key
          return (
            <li className="nav-dropdown" key={item.key}>
              <button
                type="button"
                className={isActive ? 'active nav-dropdown-trigger' : 'nav-dropdown-trigger'}
                onClick={() => setOpenKey((k) => (k === item.key ? null : item.key))}
                aria-expanded={isOpen}
              >
                {item.label} <span className="nav-caret">▾</span>
              </button>
              {isOpen && (
                <div className="nav-dropdown-menu">
                  {item.items.map((l) => (
                    <Link key={l.to} to={l.to} className="nav-dropdown-item" onClick={() => setOpenKey(null)}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          )
        })}
      </ul>
      <ThemeToggle />
    </div>
  )
}

export default Navbar
