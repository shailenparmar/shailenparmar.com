import { useEffect } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import './Layout.css'

const navItems = [
  { to: '/art', label: 'art' },
  { to: '/design', label: 'design' },
  { to: '/experience', label: 'experience' },
]

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    document.body.classList.toggle('home-active', isHome)
    return () => document.body.classList.remove('home-active')
  }, [isHome])

  return (
    <>
      {isHome && (
        <video
          className="site-bg-video"
          src="/video/home-bg.mp4"
          poster="/video/home-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      )}
      <div className={`layout ${isHome ? 'layout-home' : ''}`}>
        <header className={`header ${isHome ? 'header-home' : ''}`}>
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
    </>
  )
}
