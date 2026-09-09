import { NavLink } from 'react-router-dom'
import './Navbar.css'

const links = [
  { to: '/fund-my-mba', label: 'Fund My MBA' },
  { to: '/about', label: 'About Me' },
  { to: '/apps', label: 'Apps I Built' },
  { to: '/finance-geek', label: 'Finance Geek' },
  { to: '/deep-tech', label: 'Deep Tech' },
  { to: '/movies', label: 'Movies' },
  { to: '/books', label: 'Books' },
]

function Navbar() {
  return (
    <div className="navbar">
      <NavLink to="/" className="brand" end>
        Y
      </NavLink>
      <ul className="nav-links">
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
