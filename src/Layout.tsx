import { NavLink, Outlet, Link } from 'react-router-dom'
import './Layout.css'

const navItems = [
  { to: '/art', label: 'art' },
  { to: '/video', label: 'video' },
  { to: '/design', label: 'design' },
  { to: '/resume', label: 'resume' },
  { to: '/experience', label: 'experience' },
]

export default function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="wordmark">shailen</Link>
        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
