import { useEffect, useRef, useState, useCallback } from 'react'
import './Lightbox.css'

type Props = {
  images: string[]
  index: number
  onClose: () => void
  onNavigate: (next: number) => void
}

export default function Lightbox({ images, index, onClose, onNavigate }: Props) {
  const [zoomed, setZoomed] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const goPrev = useCallback(() => {
    setZoomed(false)
    onNavigate((index - 1 + images.length) % images.length)
  }, [index, images.length, onNavigate])

  const goNext = useCallback(() => {
    setZoomed(false)
    onNavigate((index + 1) % images.length)
  }, [index, images.length, onNavigate])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goPrev, goNext])

  useEffect(() => {
    setZoomed(false)
    if (wrapRef.current) wrapRef.current.scrollTo(0, 0)
  }, [index])

  function handleImgClick(e: React.MouseEvent<HTMLImageElement>) {
    e.stopPropagation()
    const img = imgRef.current
    const wrap = wrapRef.current
    if (!img || !wrap) return

    if (!zoomed) {
      const rect = img.getBoundingClientRect()
      const pctX = (e.clientX - rect.left) / rect.width
      const pctY = (e.clientY - rect.top) / rect.height
      setZoomed(true)
      requestAnimationFrame(() => {
        const targetX = (img.naturalWidth * pctX) - (window.innerWidth / 2)
        const targetY = (img.naturalHeight * pctY) - (window.innerHeight / 2)
        wrap.scrollTo({ left: targetX, top: targetY, behavior: 'auto' })
      })
    } else {
      setZoomed(false)
      wrap.scrollTo(0, 0)
    }
  }

  function handleWrapClick(e: React.MouseEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).tagName !== 'IMG') {
      onClose()
    }
  }

  return (
    <div
      ref={wrapRef}
      className={`lightbox ${zoomed ? 'zoomed' : 'fitted'}`}
      onClick={handleWrapClick}
    >
      <img
        ref={imgRef}
        className="lightbox-img"
        src={images[index]}
        alt=""
        onClick={handleImgClick}
        draggable={false}
      />
      <button
        className="lightbox-close"
        onClick={(e) => { e.stopPropagation(); onClose() }}
        aria-label="close"
      >×</button>
      <button
        className="lightbox-nav lightbox-prev"
        onClick={(e) => { e.stopPropagation(); goPrev() }}
        aria-label="previous"
      >‹</button>
      <button
        className="lightbox-nav lightbox-next"
        onClick={(e) => { e.stopPropagation(); goNext() }}
        aria-label="next"
      >›</button>
      <div className="lightbox-counter">{index + 1} / {images.length}</div>
    </div>
  )
}
