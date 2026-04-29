import './Gallery.css'
import './Design.css'

type Project = {
  title: string
  image?: string
  body: string
  links?: { label: string; href: string }[]
}

const projects: Project[] = [
  {
    title: 'How to use WhatsApp on your computer',
    image: '/design/whatsapp.png',
    body: 'I wrote the copy for this help page teaching users how to access WhatsApp on web. I also wrote and directed the production of the animated tutorial. It was translated into 33 languages, with each localization averaging 500K views.',
  },
  {
    title: 'WhatsApp Help Center Redesign',
    image: '/design/whatsapp-help-center.png',
    body: "As a content strategist, I drove the redesign of WhatsApp's help center. I partnered closely with product designers, UX researchers, and engineers to arrive at this design.",
  },
  {
    title: 'QuickChat',
    image: '/design/quickchat.png',
    body: '',
  },
  {
    title: 'Syndicate',
    body: 'I partnered with a DeFi startup called Bridgesplit for 2 months to create Syndicate. The premise was simple: come up with a way for a group to participate in an NFT auction together.\n\nMy main design goal was to make something that gave users a sense of presence. I figured the two most important aspects of presence in an auction were live interactivity and monetary weight. The proportional bid bar demonstrates this: as a group tries to fill their bar to be the top bid, they can see what proportion of the total each member has contributed.\n\nThere were a lot of design challenges when building this: what mechanism determines who can launch a bid? How can we visually convey a sense of urgency that’s fun and not stressful? What’s the best way to monetize?\n\nThis product was linked to every Holaplex auction in February 2022.',
  },
  {
    title: 'good days',
    image: '/design/good-days-color-picker.jpg',
    body: 'A finely tuned contraption — a journaling app where every day gets a single color picked from a 2D palette (light/dark × muted/vivid). Designed and built end-to-end. The mobile color-picker uses iPhone gestures to make picking a feeling fast and pleasurable.',
    links: [
      { label: 'gdays.day', href: 'https://gdays.day' },
      { label: 'github', href: 'https://github.com/shailenparmar/good-days' },
    ],
  },
  {
    title: 'good dos',
    body: 'A type-first calendar tasker. Local-first to-dos with calendar views, designed for keyboard-driven flow.',
    links: [
      { label: 'live', href: 'https://shailenparmar.github.io/good-dos/' },
      { label: 'github', href: 'https://github.com/shailenparmar/good-dos' },
    ],
  },
  {
    title: 'pivarshev.com',
    body: 'I helped Pavel Pivarshev build an artist portfolio for his work — grids, recreations, self-portraits, and more. Focused on responsive image optimization and a full-bleed mobile viewing experience with a click-to-zoom artwork viewer.',
    links: [
      { label: 'pivarshev.com', href: 'https://pivarshev.com' },
    ],
  },
]

export default function Design() {
  return (
    <section>
      <h1 className="page-title">design</h1>
      <p className="design-statement">
        I design extremely high-performance and fun interfaces for everyday products. My style has been refined by two decades of world-class FPV drone racing and radio-control aircraft scratchbuilding. Every airframe gram and system latency millisecond is the difference between frustration and flow. I know what it feels like for my body's kinesthetics to merge with a machine's, and I try to create software that meets this standard of fluency.
      </p>
      <p className="design-intro">
        a few projects. more on{' '}
        <a href="https://github.com/shailenparmar" target="_blank" rel="noreferrer" className="inline-link">
          github
        </a>.
      </p>
      <div className="projects">
        {projects.map((p) => (
          <article key={p.title} className="project">
            {p.image && (
              <div className="project-image">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
            )}
            <div className="project-body">
              <h2 className="project-title">{p.title}</h2>
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
        ))}
      </div>
    </section>
  )
}
