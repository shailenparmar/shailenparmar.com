import './Gallery.css'
import './Design.css'

type Project = {
  title: string
  image?: string
  imageFit?: 'cover' | 'contain'
  body: string
  links?: { label: string; href: string }[]
}

const projects: Project[] = [
  {
    title: 'good days',
    image: '/design/good-days.jpg',
    body: 'inspired by the snap of a terminal and the proportional control of an oscilloscope, good days is a precision daily editor tuned to its functional limit.',
    links: [
      { label: 'app store', href: 'https://apps.apple.com/us/app/good-days-pro/id6759430252?mt=12' },
      { label: 'gdays.day (desktop only)', href: 'https://gdays.day' },
      { label: 'github', href: 'https://github.com/shailenparmar/good-days' },
    ],
  },
  {
    title: 'lanternlibrary.org',
    image: '/design/lanternlibrary.png',
    body: 'An archive of mental health recovery stories focused on OCD, body image, and physical disability. Warm reflector aid with LLM assisted prompting to help you dig deep.',
    links: [
      { label: 'lanternlibrary.org', href: 'https://lanternlibrary.org' },
    ],
  },
  {
    title: 'colorways',
    image: '/design/good-days-color-picker.jpg',
    imageFit: 'contain',
    body: 'if you need to choose a text and background color with one hand.',
    links: [
      { label: 'gdays.day (mobile only)', href: 'https://gdays.day' },
      { label: 'github', href: 'https://github.com/shailenparmar/good-days' },
    ],
  },
  {
    title: 'good dos',
    image: '/design/good-dos.png',
    body: 'Designed for astronauts in deep space who need to write down todos as O₂ capacity approaches zero.',
    links: [
      { label: 'shailenparmar.github.io/good-dos', href: 'https://shailenparmar.github.io/good-dos/' },
      { label: 'github', href: 'https://github.com/shailenparmar/good-dos' },
    ],
  },
  {
    title: 'pivarshev.com',
    image: '/design/pivarshev.png',
    body: 'I helped artist Pavel Pivarshev build his website. Built out an immersive image-first UX, darkmode, and a full mobile experience.',
    links: [
      { label: 'pivarshev.com', href: 'https://pivarshev.com' },
      { label: 'github', href: 'https://github.com/pivarshev/pivarshev.github.io' },
    ],
  },
  {
    title: 'WhatsApp Help Center',
    image: '/design/whatsapp-tutorial.png',
    body: "As content strategist at Meta, I drove the redesign of WhatsApp's help center alongside product designers, UX researchers, and engineers.",
    links: [
      { label: 'faq.whatsapp.com', href: 'https://faq.whatsapp.com/' },
    ],
  },
  {
    title: 'QuickChat',
    image: '/design/quickchat.png',
    body: 'I led a team of 9 designers and engineers to build a functional MVP at Facebook’s 2020 Summer Hackathon — first place in remote presence and quality of work; assigned to full-time production after the win.',
  },
  {
    title: 'Syndicate',
    image: '/design/syndicate.png',
    body: 'A way for a group to participate in an NFT auction together. Built with DeFi startup Bridgesplit; linked to every Holaplex auction in February 2022.',
  },
]

export default function Design() {
  return (
    <section>
      <div className="design-statement">
        <p>I design fun interfaces for everyday products.</p>
        <p>My style has been refined by two decades of world-class FPV drone racing.</p>
        <p>
          I know what it feels like for my body's kinesthetics to merge with a machine's, and I try to create software that meets this standard of fluency.{' '}
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
    </section>
  )
}
