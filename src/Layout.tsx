import { useEffect, useRef } from 'react'
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
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    document.body.classList.toggle('home-active', isHome)
    return () => document.body.classList.remove('home-active')
  }, [isHome])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    v.muted = true
    v.playsInline = true
    v.loop = true

    const STORAGE_KEY = 'site-bg-video-time'
    const saved = parseFloat(sessionStorage.getItem(STORAGE_KEY) || '0')
    const restoreTime = () => {
      if (!(saved > 0 && isFinite(saved) && v.duration && saved < v.duration - 1)) return
      // Only seek if the target is already buffered — otherwise the seek
      // forces a re-fetch that paints a black frame for hundreds of ms.
      for (let i = 0; i < v.buffered.length; i++) {
        if (saved >= v.buffered.start(i) && saved <= v.buffered.end(i)) {
          try { v.currentTime = saved } catch { /* noop */ }
          return
        }
      }
      // Target not buffered yet — wait for more data, then try once.
      const onProgress = () => {
        for (let i = 0; i < v.buffered.length; i++) {
          if (saved >= v.buffered.start(i) && saved <= v.buffered.end(i)) {
            v.removeEventListener('progress', onProgress)
            try { v.currentTime = saved } catch { /* noop */ }
            return
          }
        }
      }
      v.addEventListener('progress', onProgress)
    }
    if (v.readyState >= 1) restoreTime()
    else v.addEventListener('loadedmetadata', restoreTime, { once: true })

    const saveTime = () => {
      if (v.currentTime > 0) sessionStorage.setItem(STORAGE_KEY, String(v.currentTime))
    }
    const saveInterval = window.setInterval(saveTime, 1000)
    window.addEventListener('pagehide', saveTime)
    window.addEventListener('beforeunload', saveTime)

    let stopped = false

    const tryPlay = () => {
      if (stopped) return
      // Don't fight the browser mid-seek or before it has frames — that
      // causes AbortError loops and visible black flickers.
      if (v.seeking || v.readyState < 3) return
      if (v.paused) {
        const p = v.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
      }
    }

    // 2s watchdog — long enough to not collide with a seek, short enough
    // to recover from a stray pause within a frame budget the eye won't catch.
    const interval = window.setInterval(tryPlay, 2000)

    const onPause = () => tryPlay()
    const onCanPlay = () => tryPlay()
    const onLoadedData = () => tryPlay()
    const onVisibility = () => { if (!document.hidden) tryPlay() }
    const onUserInteract = () => tryPlay()
    const onEnded = () => {
      // Belt-and-suspenders loop: native `loop` attr should handle it, but
      // some browsers fail to restart after long sessions or seek-near-end.
      try { v.currentTime = 0 } catch { /* noop */ }
      sessionStorage.setItem(STORAGE_KEY, '0')
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }

    v.addEventListener('canplay', onCanPlay)
    v.addEventListener('loadeddata', onLoadedData)
    v.addEventListener('pause', onPause)
    v.addEventListener('ended', onEnded)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('focus', tryPlay)
    document.addEventListener('click', onUserInteract, true)
    document.addEventListener('keydown', onUserInteract, true)
    document.addEventListener('touchstart', onUserInteract, { capture: true, passive: true })

    tryPlay()

    return () => {
      stopped = true
      saveTime()
      window.clearInterval(interval)
      window.clearInterval(saveInterval)
      window.removeEventListener('pagehide', saveTime)
      window.removeEventListener('beforeunload', saveTime)
      v.removeEventListener('canplay', onCanPlay)
      v.removeEventListener('loadeddata', onLoadedData)
      v.removeEventListener('pause', onPause)
      v.removeEventListener('ended', onEnded)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('focus', tryPlay)
      document.removeEventListener('click', onUserInteract, true)
      document.removeEventListener('keydown', onUserInteract, true)
      document.removeEventListener('touchstart', onUserInteract, true)
    }
  }, [])

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
