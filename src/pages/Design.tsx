import './Gallery.css'

const items = [
  { src: '/design/whatsapp.png', caption: 'whatsapp' },
  { src: '/design/whatsapp-help-center.png', caption: 'whatsapp help center' },
  { src: '/design/quickchat.png', caption: 'quickchat' },
]

export default function Design() {
  return (
    <section>
      <h1 className="page-title">design</h1>
      <div className="stack">
        {items.map((item) => (
          <figure key={item.src}>
            <img src={item.src} alt={item.caption} loading="lazy" />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
