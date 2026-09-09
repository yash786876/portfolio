import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

const links = [
  { to: '/fund-my-mba', label: 'Fund My MBA' },
  { to: '/about', label: 'About Me' },
  { to: '/apps', label: 'Apps I Built' },
  { to: '/deep-tech', label: 'Deep Tech' },
  { to: '/movies', label: 'Movies' },
  { to: '/books', label: 'Books' },
]

const financeSubLinks = [
  { to: '/finance-geek', label: 'Overview' },
  { to: '/finance-geek?open=dcf-model', label: 'DCF Model' },
  { to: '/finance-geek?open=industry-analysis', label: 'Industry Analysis' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const location = useLocation()
  const isFinanceActive = location.pathname === '/finance-geek'

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div className="navbar">
      <NavLink to="/" className="brand" end>
        Y
      </NavLink>
      <ul className="nav-links">
        <li className="nav-dropdown" ref={ref}>
          <button
            type="button"
            className={isFinanceActive ? 'active nav-dropdown-trigger' : 'nav-dropdown-trigger'}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
          >
            Finance Geek <span className="nav-caret">▾</span>
          </button>
          {open && (
            <div className="nav-dropdown-menu">
              {financeSubLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="nav-dropdown-item"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </li>
        {links.map((l) => (
          <li key={l.to}>
            <NavLink to={l.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Navbar
