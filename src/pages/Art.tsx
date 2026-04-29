import { useState } from 'react'
import Lightbox from '../components/Lightbox'
import './Gallery.css'

const files = Array.from({ length: 36 }, (_, i) =>
  `art-${String(i + 1).padStart(2, '0')}.jpg`
)

const sources = files.map((f) => `/art/${f}`)

export default function Art() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section>
      <h1 className="page-title">art</h1>
      <div className="grid">
        {files.map((file, i) => (
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
          images={sources}
          index={open}
          onClose={() => setOpen(null)}
          onNavigate={(next) => setOpen(next)}
        />
      )}
    </section>
  )
}
