import { useState } from 'react'
import './Resume.css'

type Job = {
  company: React.ReactNode
  location: string
  role: string
  start: string
  end: string
  bullets: string[]
}

const work: Job[] = [
  {
    company: 'Shamoun & Norman',
    location: 'Dallas, TX',
    role: 'Legal Assistant',
    start: 'Jan 2026',
    end: 'Present',
    bullets: [
      'Analyze legal documents, draft case summaries, and review testimony for inconsistencies to support attorneys in case preparation.',
      'Synthesize large volumes of complex information into clear, actionable briefs for senior stakeholders.',
    ],
  },
  {
    company: 'Meta (WhatsApp)',
    location: 'San Francisco, CA',
    role: 'Content Strategist',
    start: 'Aug 2021',
    end: 'Nov 2022',
    bullets: [
      'Conducted competitive analyses of help-center platforms across leading tech companies; delivered weekly research presentations to product and engineering stakeholders.',
      'Analyzed user behavior data and support-ticket patterns to redesign Help Center information architecture; reduced support volume across a 2B+ user base.',
      'Published 30+ feature-launch articles reaching ~15M views/month across 33 languages; coordinated cross-functionally with product, engineering, legal, and localization teams.',
      'Tracked content performance metrics across 33 markets to prioritize strategy and inform product decisions; promoted within first 6 months.',
    ],
  },
  {
    company: 'Shelton School',
    location: 'Dallas, TX',
    role: 'Substitute Teacher',
    start: 'Nov 2023',
    end: 'Jan 2026',
    bullets: [
      'Taught students with neurological learning differences (autism, ADHD, OCD); adapted lessons and classroom structure to individual needs.',
    ],
  },
  {
    company: 'Project Arts',
    location: 'Durham, NC',
    role: 'Program Director',
    start: 'Aug 2019',
    end: 'Aug 2021',
    bullets: [
      'Managed end-to-end logistics for a 10-day program (36 participants, 24 staff, $12K budget); achieved 100% participant satisfaction.',
    ],
  },
]

const designProjects: Job[] = [
  {
    company: 'good days pro',
    location: '',
    role: 'Designer & Builder',
    start: '2024',
    end: 'Present',
    bullets: [
      'Designed and built a precision daily editor — every color hex, scratch-made UX, encrypted on device. Shipped to the App Store.',
    ],
  },
  {
    company: 'lanternlibrary.org',
    location: '',
    role: 'Designer & Builder',
    start: '2026',
    end: 'Present',
    bullets: [
      'An archive of identity-reconstruction recovery stories. Designed the contributor reflection flow (warm AI-guided voice + text) and the reader semantic-match experience.',
    ],
  },
  {
    company: 'pivarshev.com',
    location: '',
    role: 'Designer',
    start: '2024',
    end: '2025',
    bullets: [
      "Built artist Pavel Pivarshev's portfolio site. Immersive image-first UX, dark mode, and a full mobile experience with click-to-zoom artwork viewer.",
    ],
  },
  {
    company: 'good dos',
    location: '',
    role: 'Designer & Builder',
    start: '2024',
    end: 'Present',
    bullets: [
      'A type-first calendar tasker, tuned to its functional limit. Pure functionalism: function becomes form.',
    ],
  },
  {
    company: 'colorways',
    location: '',
    role: 'Designer & Builder',
    start: '2024',
    end: 'Present',
    bullets: [
      'A one-handed mobile color picker for choosing text + background color via a 2D plane (light/dark × muted/vivid). Ships inside good days pro.',
    ],
  },
  {
    company: 'Syndicate',
    location: '',
    role: 'Product Designer',
    start: 'Jan 2022',
    end: 'Feb 2022',
    bullets: [
      'Group NFT auctions. Designed the proportional bid bar and live presence flow; shipped against every Holaplex auction in February 2022.',
    ],
  },
]

const technical: Job[] = [
  {
    company: 'Duke University',
    location: '',
    role: 'Immersive Virtual Worlds',
    start: 'Jan 2020',
    end: 'May 2020',
    bullets: [
      'Designed and built 6 interactive 3D environments in Unreal Engine 5; implemented gameplay systems with Blueprint visual scripting including event-driven triggers, state management, and real-time input mapping.',
    ],
  },
  {
    company: 'XPRIZE Shell Ocean Discovery Competition',
    location: 'Duke University',
    role: 'Pilot & Engineer',
    start: 'Aug 2018',
    end: 'Dec 2018',
    bullets: [
      'Built and piloted a 7-foot, 12-rotor drone for ocean mapping; placed 9th globally and received a $100K prize.',
      'Presented research on manual PID control of large-scale multirotors at the Duke engineering poster competition.',
    ],
  },
  {
    company: (
      <>
        <a href="https://www.tiktok.com/@shailentok" target="_blank" rel="noreferrer">TikTok</a>
        {', '}
        <a href="https://www.youtube.com/@shailen" target="_blank" rel="noreferrer">YouTube</a>
        {', '}
        <a href="https://www.instagram.com/shailenstagram" target="_blank" rel="noreferrer">Instagram</a>
      </>
    ),
    location: '',
    role: 'Content Creator',
    start: '2013',
    end: 'Present',
    bullets: [
      '4.1M+ views and 535K likes on TikTok; 370+ videos across three platforms with hands-on understanding of creator incentives, platform dynamics, discoverability, and audience engagement.',
    ],
  },
]

const skillGroups = [
  { label: 'research & analysis', items: 'Competitive analysis, market research, user-behavior analytics, content performance metrics, data synthesis' },
  { label: 'tools', items: 'Unreal Engine 5 (Blueprint), Tableau, Figma, Google Workspace, Microsoft Office, CMS platforms' },
  { label: 'content & platforms', items: 'Short-form video production, social-media strategy (TikTok, YouTube, Instagram), creator-platform dynamics' },
  { label: 'interests', items: 'FPV drone racing, improv comedy, short-form video, chess' },
]

function JobBlock({ job }: { job: Job }) {
  return (
    <li className="job">
      <div className="job-head">
        <div>
          <div className="job-company">{job.company}</div>
          <div className="job-role">{job.role}</div>
        </div>
        <div className="job-meta">
          {job.location && <div>{job.location}</div>}
          <div>{job.start} — {job.end}</div>
        </div>
      </div>
      <ul className="job-bullets">
        {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </li>
  )
}

export default function Experience() {
  const [copied, setCopied] = useState(false)
  const email = 'shailenparmar@gmail.com'

  function copyEmail(e: React.MouseEvent) {
    e.preventDefault()
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    }).catch(() => {})
  }

  return (
    <section className="resume">
      <div className="contact">
        <a
          href={`mailto:${email}`}
          onClick={copyEmail}
          className="email-link"
        >
          {copied ? 'copied' : email}
        </a>
        <span className="dot" aria-hidden="true">·</span>
        <a href="tel:+12146738233">214.673.8233</a>
        <span className="dot" aria-hidden="true">·</span>
        <a href="https://linkedin.com/in/shailenparmar" target="_blank" rel="noreferrer">
          linkedin.com/in/shailenparmar
        </a>
        <span className="contact-location">Dallas · SF · NYC</span>
      </div>

      <h2 className="section-heading">education</h2>
      <div className="edu">
        <div className="job-head">
          <div>
            <div className="job-company">Duke University</div>
            <div className="job-role">Trinity College of Arts and Sciences</div>
          </div>
          <div className="job-meta">
            <div>Aug 2017 — May 2021</div>
          </div>
        </div>
        <div className="edu-body">
          B.A., Interdepartmental Major in Neuroscience and Visual &amp; Media Studies · GPA 3.80
        </div>
        <div className="edu-coursework">
          <span className="coursework-label">relevant coursework: </span>
          Immersive Virtual Worlds (Unreal Engine 5), Computer Science (Python), Data Visualization (Tableau), Cognitive Neuroscience
        </div>
      </div>

      <h2 className="section-heading">professional experience</h2>
      <ul className="job-list">
        {work.map((j) => <JobBlock key={String(j.company)} job={j} />)}
      </ul>

      <h2 className="section-heading">design projects</h2>
      <ul className="job-list">
        {designProjects.map((j) => <JobBlock key={String(j.company)} job={j} />)}
      </ul>

      <h2 className="section-heading">technical &amp; creator experience</h2>
      <ul className="job-list">
        {technical.map((j, i) => <JobBlock key={i} job={j} />)}
      </ul>

      <h2 className="section-heading">skills &amp; interests</h2>
      <dl className="skill-groups">
        {skillGroups.map((g) => (
          <div className="skill-row" key={g.label}>
            <dt>{g.label}</dt>
            <dd>{g.items}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
