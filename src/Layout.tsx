import { useEffect, useRef } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import './Layout.css'

const navItems = [
  { to: '/art', label: 'art' },
  { to: '/projects', label: 'projects' },
  { to: '/experience', label: 'connect' },
]

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    document.body.classList.toggle('home-active', isHome)
    document.documentElement.classList.toggle('home-active', isHome)
    return () => {
      document.body.classList.remove('home-active')
      document.documentElement.classList.remove('home-active')
    }
  }, [isHome])

  // Tag the route so mobile can hardcode per-page colors (picker is desktop-only).
  useEffect(() => {
    const map: Record<string, string> = {
      '/': 'page-home',
      '/art': 'page-art',
      '/projects': 'page-projects',
      '/experience': 'page-connect',
    }
    const cls = map[location.pathname]
    const el = document.documentElement
    if (cls) el.classList.add(cls)
    return () => {
      if (cls) el.classList.remove(cls)
    }
  }, [location.pathname])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const sync = () => {
      const shouldPlay = isHome && !document.hidden
      if (shouldPlay && v.paused) {
        v.play().catch(() => {})
      } else if (!shouldPlay && !v.paused) {
        v.pause()
      }
    }

    sync()
    document.addEventListener('visibilitychange', sync)

    return () => {
      document.removeEventListener('visibilitychange', sync)
    }
  }, [isHome])

  return (
    <>
      <video
        ref={videoRef}
        className={`site-bg-video ${isHome ? 'visible' : ''}`}
        src="/video/home-bg.mp4"
        poster="/video/home-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className={`layout ${isHome ? 'layout-home' : ''}`}>
        <header className={`header ${isHome ? 'header-home' : ''}`}>
          <Link to="/" className="wordmark">shailen parmar</Link>
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
