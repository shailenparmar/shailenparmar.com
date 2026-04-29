import './Gallery.css'
import './Video.css'

const videos = [
  { id: 'COIyoqTVJyY', title: '' },
  { id: 'H_vwtr82L9o', title: '' },
  { id: 'krkoyhJsbvw', title: '' },
  { id: 'lW11LgNkEn8', title: '' },
  { id: 'NMlATq3UmqI', title: '' },
  { id: 'sExiObXlMnQ', title: '' },
]

export default function Video() {
  return (
    <section>
      <h1 className="page-title">video</h1>
      <div className="grid grid-video">
        {videos.map((v) => (
          <a
            key={v.id}
            href={`https://www.youtube.com/watch?v=${v.id}`}
            target="_blank"
            rel="noreferrer"
            className="tile video-tile"
            aria-label={v.title || 'play video'}
          >
            <img
              src={`/video/thumbs/${v.id}.jpg`}
              alt={v.title}
              loading="lazy"
            />
            <span className="play-icon" aria-hidden="true">▸</span>
          </a>
        ))}
      </div>
    </section>
  )
}
