import TopButton from '../components/TopButton'
import Colorways from '../components/Colorways'
import './Gallery.css'
import './Design.css'
import './Neuralink.css'

// Dedicated, role-specific page for the Neuralink UI Design Engineer application.
// Unlinked from the main nav by design — it's the single link at the top of the
// application, an argument (control-feel + shipping), not a general gallery.
// Plan + rationale: ~/projects/neuralink-telepathy-demo/PORTFOLIO_PLAN.txt

type Section = {
  kicker: string
  title: string
  image?: string
  imagePosition?: string
  body: string
  links?: { label: string; href: string }[]
}

const sections: Section[] = [
  {
    kicker: 'the loop',
    title: 'i tune control loops by hand',
    image: '/design/drones.png',
    imagePosition: 'center 30%',
    body:
      "a flight controller takes a noisy signal, runs a control loop, and produces motion. you tune it — gain, damping, latency against overshoot — until the craft feels right. a bci decoder does the same thing: noisy neural signal in, a cursor and a click out.\n\ni've spent 15 years on that exact loop. pid-tuning fpv race drones, and hand-tuning the spring tension and rate curves on transmitter gimbals, optimizing the feel of an input device against differences most people can't consciously perceive. it's the same 'a slight difference in a spring coefficient changes perceptual response time' problem this role is built around.\n\nat the xprize shell ocean discovery competition i built and piloted a 7-foot, 12-rotor drone — 9th in the world, a $100k prize — and presented research on manual pid control of large multirotors at duke.",
    links: [{ label: 'flight videos', href: 'https://photos.app.goo.gl/PqFfXuQA5yGj4hxR7' }],
  },
  {
    kicker: 'the ship',
    title: 'good days',
    image: '/design/good-days.jpg',
    body:
      "a daily editor i designed, built, and shipped end to end — live on the web and the mac app store, refined across many released versions. concept, nth prototype, release, nth iteration: the whole arc, in public.\n\ninspired by the snap of a terminal and the proportional control of an oscilloscope, tuned to its functional limit.",
    links: [
      { label: 'gdays.day', href: 'https://gdays.day' },
      { label: 'app store', href: 'https://apps.apple.com/us/app/good-days-pro/id6759430252?mt=12' },
      { label: 'github', href: 'https://github.com/shailenparmar/good-days' },
    ],
  },
  {
    kicker: 'no traditional feedback',
    title: 'colorways',
    image: '/design/good-days-color-picker.jpg',
    body:
      "the good days color picker, reinvented for a phone. three axes across two parameters, controlled with one hand by tilt and multitouch — no sliders, no on-screen controls to lean on. you operate it by feel, not by sight.\n\nthat's the medium this role lives in: designing an interface that has to feel right without the friction of glass or the resistance of a spring to guide you.",
    links: [
      { label: 'try it (gdays.day, mobile)', href: 'https://gdays.day' },
      { label: 'github', href: 'https://github.com/shailenparmar/good-days' },
    ],
  },
  {
    kicker: 'built for telepathy',
    title: 'meaning per click',
    body:
      "i prototyped a working telepathy-style interface that uses a laptop webcam as an honest stand-in for the n1 implant: head pose drives a cursor, a dwell or gesture fires a click — the same cursor-plus-click a motor-cortex decoder outputs.\n\nbecause a bci is bandwidth-starved, the ui maximizes meaning per click: context-aware full sentences first (one click), word prediction next, a letter keyboard as the floor, plus a text-to-speech channel for using it without the screen. fully offline, grounded in real als staging and access-channel research.",
    // TODO host index.html publicly and link it here.
    links: [],
  },
  {
    kicker: 'the backbone',
    title: 'neuroscience + a different body',
    body:
      "b.a. in neuroscience and visual & media studies from duke (gpa 3.80). i taught students with neurological learning differences — autism, adhd, ocd — and built lanternlibrary.org, an archive of recovery stories around disability and body image.\n\ndesigning for a sensory experience that isn't your own is the part of this i care about most.",
    // TODO add OptiLab / Greg Appelbaum once details confirmed (STRATEGY.txt §OptiLab).
    links: [{ label: 'lanternlibrary.org', href: 'https://lanternlibrary.org' }],
  },
]

export default function Neuralink() {
  return (
    <section>
      <div className="design-hero">
        <div className="design-statement nl-hero">
          <p>a brain-computer interface is a control loop between a person and a machine, tuned on differences most people can't feel.</p>
          <p>i've spent 15 years tuning exactly that — by hand, on racing drones — and shipping the software that has to feel right.</p>
          <p className="nl-hero-sub">touch the picker below: it's a no-feedback interface i built, recoloring this page live.</p>
        </div>
        <Colorways />
      </div>

      <div className="nl-sections">
        {sections.map((s) => (
          <article key={s.title} className="nl-section">
            {s.image && (
              <div className="nl-section-media">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  style={s.imagePosition ? { objectPosition: s.imagePosition } : undefined}
                />
              </div>
            )}
            <div className="nl-section-body">
              <div className="nl-kicker">{s.kicker}</div>
              <h2 className="nl-title">{s.title}</h2>
              <div className="project-text">
                {s.body.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              {s.links && s.links.length > 0 && (
                <div className="project-links">
                  {s.links.map((l) => (
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

      <div className="nl-close design-statement">
        <p>most engineers can't design. most designers can't ship. i do both, on exactly this kind of feedback-less control problem.</p>
        <p>
          let's build it together —{' '}
          <a href="https://github.com/shailenparmar" target="_blank" rel="noreferrer" className="design-github-inline">github ↗</a>
        </p>
      </div>

      <TopButton />
    </section>
  )
}
