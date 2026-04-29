import './Home.css'

export default function Home() {
  return (
    <section className="home">
      <video
        className="home-bg"
        src="/video/home-bg.mp4"
        poster="/video/home-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="home-overlay" aria-hidden="true" />
      <p className="tagline">
        i'm a visual storyteller obsessed with capturing human beauty from up close and far away. i'd love to meet you.
      </p>
    </section>
  )
}
