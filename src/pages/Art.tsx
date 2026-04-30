import { useState } from 'react'
import Lightbox from '../components/Lightbox'
import './Gallery.css'
import './Video.css'

type VideoItem = { href: string; thumb: string }

// Mapping from Wix arts page (proximity-matched in HTML):
//   NzsuVV1sIoQ (humane)        → art-01
//   sExiObXlMnQ (we love you)   → art-02
//   COIyoqTVJyY (butterfly)     → art-03
//   krkoyhJsbvw (kite)          → art-05
//   H_vwtr82L9o (800 dollars)   → art-06
//   the-iphone (local mp4)      → art-09
//   lW11LgNkEn8 (P-38)          → /video/thumbs/lW11LgNkEn8.jpg
//   NMlATq3UmqI (electric blood)→ /video/thumbs/NMlATq3UmqI.jpg
//   SqfzNoavjzg (Invincibility) → /video/thumbs/SqfzNoavjzg.jpg
const videos: VideoItem[] = [
  { href: 'https://www.youtube.com/watch?v=NzsuVV1sIoQ', thumb: '/art/art-01.jpg' },
  { href: 'https://www.youtube.com/watch?v=sExiObXlMnQ', thumb: '/art/art-02.jpg' },
  { href: 'https://www.youtube.com/watch?v=COIyoqTVJyY', thumb: '/art/art-03.jpg' },
  { href: 'https://www.youtube.com/watch?v=krkoyhJsbvw', thumb: '/art/art-05.jpg' },
  { href: 'https://www.youtube.com/watch?v=H_vwtr82L9o', thumb: '/art/art-06.jpg' },
  { href: 'https://www.youtube.com/watch?v=lW11LgNkEn8', thumb: '/video/thumbs/lW11LgNkEn8.jpg' },
  { href: 'https://www.youtube.com/watch?v=NMlATq3UmqI', thumb: '/video/thumbs/NMlATq3UmqI.jpg' },
  { href: 'https://www.youtube.com/watch?v=SqfzNoavjzg', thumb: '/video/thumbs/SqfzNoavjzg.jpg' },
  { href: '/video/the-iphone.mp4', thumb: '/art/art-09.jpg' },
]

// Photos: exclude art-01, 02, 03, 05, 06, 09 (used as video thumbnails)
const photoNumbers = [4, 7, 8, ...Array.from({ length: 27 }, (_, i) => i + 10)]
const photos = photoNumbers.map((n) => `art-${String(n).padStart(2, '0')}.jpg`)

const photoSources = photos.map((f) => `/art/${f}`)

export default function Art() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section>
      <div className="grid">
        {videos.map((v) => (
          <a
            key={v.href}
            href={v.href}
            target="_blank"
            rel="noreferrer"
            className="tile video-tile"
            aria-label="play video"
          >
            <img src={v.thumb} alt="" loading="lazy" />
            <span className="play-icon" aria-hidden="true">▸</span>
          </a>
        ))}

        {photos.map((file, i) => (
          <button
            type="button"
            key={file}
            className="tile tile-button"
            onClick={() => setOpen(i)}
            aria-label={`open image ${i + 1}`}
          >
            <img src={`/art/${file}`} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      {open !== null && (
        <Lightbox
          images={photoSources}
          index={open}
          onClose={() => setOpen(null)}
          onNavigate={(next) => setOpen(next)}
        />
      )}
    </section>
  )
}
