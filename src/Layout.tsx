import { useEffect, useRef } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import './Layout.css'

const navItems = [
  { to: '/art', label: 'art' },
  { to: '/projects', label: 'projects' },
  { to: '/experience', label: 'experience' },
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

    const onEnded = () => {
      v.currentTime = 0
      v.play().catch(() => {})
    }

    sync()
    document.addEventListener('visibilitychange', sync)
    v.addEventListener('ended', onEnded)

    return () => {
      document.removeEventListener('visibilitychange', sync)
      v.removeEventListener('ended', onEnded)
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
