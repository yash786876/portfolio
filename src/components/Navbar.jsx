import { NavLink } from 'react-router-dom'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Me' },
  { to: '/apps', label: 'Apps I Built' },
  { to: '/finance-geek', label: 'Finance Geek' },
  { to: '/deep-tech', label: 'The World of Deep Tech' },
  { to: '/movies', label: 'Movie Recommendations' },
  { to: '/books', label: 'Books Recommendations' },
  { to: '/sports', label: 'Sports' },
]

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="brand" end>
        Yash Santwani
      </NavLink>
      <ul className="nav-links">
        {links
          .filter((l) => l.to !== '/')
          .map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                {l.label}
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default Navbar
