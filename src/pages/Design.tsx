import TopButton from '../components/TopButton'
import './Gallery.css'
import './Design.css'

type Project = {
  title: string
  image?: string
  imageFit?: 'cover' | 'contain'
  imagePosition?: string
  body: string
  links?: { label: string; href: string }[]
}

const projects: Project[] = [
  {
    title: 'good days',
    image: '/design/good-days.jpg',
    body: 'inspired by the snap of a terminal and the proportional control of an oscilloscope, good days is a precision daily editor tuned to its functional limit.',
    links: [
      { label: 'gdays.day (desktop only)', href: 'https://gdays.day' },
      { label: 'app store', href: 'https://apps.apple.com/us/app/good-days-pro/id6759430252?mt=12' },
      { label: 'github', href: 'https://github.com/shailenparmar/good-days' },
    ],
  },
  {
    title: 'lanternlibrary.org',
    image: '/design/lanternlibrary.png',
    body: 'an archive of mental health recovery stories focused on ocd, body image, and physical disability. warm reflector aid with llm assisted prompting to help you dig deep.',
    links: [
      { label: 'lanternlibrary.org', href: 'https://lanternlibrary.org' },
    ],
  },
  {
    title: 'colorways',
    image: '/design/good-days-color-picker.jpg',
    body: 'novel interface for selecting hexcodes. control 3 axes across 2 parameters with 1 hand. slight learning curve, very handy. try it out.',
    links: [
      { label: 'gdays.day (mobile only)', href: 'https://gdays.day' },
      { label: 'github', href: 'https://github.com/shailenparmar/good-days' },
    ],
  },
  {
    title: 'good dos',
    image: '/design/good-dos.png',
    body: 'designed for astronauts in deep space who need to write down todos as O₂ capacity approaches zero.',
    links: [
      { label: 'shailenparmar.github.io/good-dos', href: 'https://shailenparmar.github.io/good-dos/' },
      { label: 'github', href: 'https://github.com/shailenparmar/good-dos' },
    ],
  },
  {
    title: 'pivarshev.com',
    image: '/design/pivarshev.png',
    body: 'i helped artist pavel pivarshev build his website. built out an immersive image-first ux, darkmode, and a full mobile experience.',
    links: [
      { label: 'pivarshev.com', href: 'https://pivarshev.com' },
      { label: 'github', href: 'https://github.com/pivarshev/pivarshev.github.io' },
    ],
  },
  {
    title: 'whatsapp help center',
    image: '/design/whatsapp-tutorial.png',
    body: "as content strategist at meta, i drove the redesign of whatsapp's help center alongside product designers, ux researchers, and engineers.",
    links: [
      { label: 'faq.whatsapp.com', href: 'https://faq.whatsapp.com/' },
    ],
  },
  {
    title: 'quickchat',
    image: '/design/quickchat.png',
    body: "i led a team of 9 designers and engineers to build a functional mvp at facebook's 2020 summer hackathon — first place in remote presence and quality of work; assigned to full-time production after the win.",
  },
  {
    title: 'syndicate',
    image: '/design/syndicate.png',
    body: 'a way for a group to participate in an nft auction together. built with defi startup bridgesplit; linked to every holaplex auction in february 2022.',
  },
]

export default function Design() {
  return (
    <section>
      <div className="design-statement">
        <p>i design fun interfaces for everyday products.</p>
        <p>my style has been refined by a decade of world-class fpv drone racing.</p>
        <p>
          i know what it feels like for my body's kinesthetics to merge with a machine's, and i try to create software that meets this standard of fluency.{' '}
          <a
            href="https://github.com/shailenparmar"
            target="_blank"
            rel="noreferrer"
            className="design-github-inline"
          >
            github ↗
          </a>
        </p>
      </div>
      <div className="design-grid">
        {projects.map((p) => {
          const primary = p.links?.[0]?.href
          const ImageWrap = ({ children }: { children: React.ReactNode }) =>
            primary ? (
              <a href={primary} target="_blank" rel="noreferrer" className="project-image project-image-link">
                {children}
              </a>
            ) : (
              <div className="project-image">{children}</div>
            )
          const titleHref =
            p.title === 'good days' ? 'https://gdays.day' : primary
          return (
          <article key={p.title} className="project-card">
            <ImageWrap>
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className={p.imageFit === 'contain' ? 'project-img-contain' : ''}
                  style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined}
                />
              ) : (
                <div className="project-image-empty" aria-hidden="true">
                  <span>{p.title.toLowerCase()}</span>
                </div>
              )}
            </ImageWrap>
            <div className="project-body">
              <h2 className="project-title">
                {titleHref ? (
                  <a
                    href={titleHref}
                    target="_blank"
                    rel="noreferrer"
                    className="project-title-link"
                  >
                    {p.title}
                  </a>
                ) : (
                  p.title
                )}
              </h2>
              {p.body && (
                <div className="project-text">
                  {p.body.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
              {p.links && (
                <div className="project-links">
                  {p.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
          )
        })}
      </div>

      <TopButton />
    </section>
  )
}
