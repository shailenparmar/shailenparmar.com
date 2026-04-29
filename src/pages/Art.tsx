import { useState } from 'react'
import Lightbox from '../components/Lightbox'
import './Gallery.css'
import './Video.css'

const videos = [
  'COIyoqTVJyY',
  'H_vwtr82L9o',
  'krkoyhJsbvw',
  'lW11LgNkEn8',
  'NMlATq3UmqI',
  'sExiObXlMnQ',
  'NzsuVV1sIoQ',
  'SqfzNoavjzg',
]

const photos = Array.from({ length: 36 }, (_, i) =>
  `art-${String(i + 1).padStart(2, '0')}.jpg`
)

const photoSources = photos.map((f) => `/art/${f}`)

export default function Art() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section>
      <h1 className="page-title">art</h1>

      <div className="grid">
        {videos.map((id) => (
          <a
            key={id}
            href={`https://www.youtube.com/watch?v=${id}`}
            target="_blank"
            rel="noreferrer"
            className="tile video-tile"
            aria-label="play video"
          >
            <img src={`/video/thumbs/${id}.jpg`} alt="" loading="lazy" />
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
