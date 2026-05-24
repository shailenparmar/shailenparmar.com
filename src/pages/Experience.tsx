import { useState } from 'react'
import TopButton from '../components/TopButton'
import './Resume.css'
import './Design.css'

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
    company: 'Meta (WhatsApp)',
    location: 'San Francisco, CA',
    role: 'Content Strategist',
    start: 'Aug 2021',
    end: 'Nov 2022',
    bullets: [
      'Published 30+ feature-launch articles reaching ~15M views/month across 33 languages; coordinated cross-functionally with product, engineering, legal, and localization teams.',
      'Analyzed user behavior data and support-ticket patterns to redesign Help Center information architecture; reduced support volume across a 2B+ user base.',
      'Conducted competitive analyses of help-center platforms across leading tech companies; delivered weekly research presentations to product and engineering stakeholders.',
      'Tracked content performance metrics across 33 markets to prioritize strategy and inform product decisions; promoted within first 6 months.',
    ],
  },
  {
    company: 'San Francisco Zen Center',
    location: 'San Francisco, CA',
    role: 'Work Practice Apprentice',
    start: 'Feb 2025',
    end: 'May 2025',
    bullets: [
      'Two-month residential apprenticeship at SFZC City Center, one of the longest-running Zen training communities in the West.',
      'Full daily schedule of zazen, services, study, and work practice alongside the kitchen and guest crews.',
      'Work as practice: every task — cooking, cleaning, hosting — done with the same attention as meditation. Living and working closely with a community of ~40 residents.',
    ],
  },
  {
    company: 'Green Gulch Farm Zen Center',
    location: 'Marin, CA',
    role: 'Guest Student',
    start: 'Oct 2024',
    end: 'Oct 2024',
    bullets: [
      'Two-week residential stay in the daily life of the temple — zazen, services, and work practice with the farm, garden, and guest crews.',
      'Prerequisite for the Work Practice Apprenticeship at City Center.',
    ],
  },
  {
    company: 'Shelton School',
    location: 'Dallas, TX',
    role: 'Substitute Teacher',
    start: 'Nov 2023 — Jan 2025; May 2025',
    end: 'Jan 2026',
    bullets: [
      'Taught students with neurological learning differences (autism, ADHD, OCD); adapted lessons and classroom structure to individual needs.',
    ],
  },
  {
    company: 'Shamoun & Norman',
    location: 'Dallas, TX',
    role: 'Legal Assistant',
    start: 'Jan 2026',
    end: 'Present',
    bullets: [
      'Drafting case summaries, reviewing testimony, and synthesizing case files for attorneys in trial preparation.',
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
          <div>{job.start === job.end ? job.start : `${job.start} — ${job.end}`}</div>
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
  const [showResume, setShowResume] = useState(false)
  // Assembled at runtime so the raw address never sits in the page source (scraper avoidance).
  const email = 'shailenparmar' + '@' + 'gmail.com'

  function copyEmail(e: React.MouseEvent) {
    e.preventDefault()
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    }).catch(() => {})
  }

  return (
    <section className="resume">
      <div className="design-statement">
        <p>at duke, i studied neuroscience and visual design. since then, i've worked in big tech, taught middle school, and lived in a buddhist monastery. i'm looking for my next job to go deep in.</p>
        <p>
          some people who have inspired me:{' '}
          <a href="https://en.wikipedia.org/wiki/Marshall_Rosenberg" target="_blank" rel="noreferrer" className="inspiration-link">marshall rosenberg</a>,{' '}
          <a href="https://www.youtube.com/results?search_query=steve+jobs+the+iphone" target="_blank" rel="noreferrer" className="inspiration-link">steve jobs</a>,{' '}
          <a href="https://rosalewis.co.uk/" target="_blank" rel="noreferrer" className="inspiration-link">rosa lewis</a>,{' '}
          <a href="https://www.youtube.com/watch?v=brjQ_mVO0Dc" target="_blank" rel="noreferrer" className="inspiration-link">dave powers</a>,{' '}
          <a href="https://hermesamara.org/rob-burbea" target="_blank" rel="noreferrer" className="inspiration-link">rob burbea</a>,{' '}
          <a href="https://www.youtube.com/watch?v=2JA9dE52Myg&list=RD2JA9dE52Myg&start_radio=1" target="_blank" rel="noreferrer" className="inspiration-link">lorde</a>,{' '}
          <a href="https://www.youtube.com/watch?v=MGQ8fGrrBeU" target="_blank" rel="noreferrer" className="inspiration-link">frank yang</a>, and{' '}
          <a href="https://www.youtube.com/watch?v=cSv_zalJLTQ" target="_blank" rel="noreferrer" className="inspiration-link">beth upton</a>.
        </p>
      </div>

      <div className="contact">
        <a
          href="#"
          onClick={copyEmail}
          className="email-link"
          aria-label="copy email address"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              copied
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              </svg>
              copy email
            </>
          )}
        </a>
        <span className="dot" aria-hidden="true">·</span>
        <button
          type="button"
          className="resume-toggle"
          onClick={() => setShowResume((v) => !v)}
        >
          {showResume ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              close resume
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="16" y2="17" />
              </svg>
              open resume
            </>
          )}
        </button>
        <span className="dot" aria-hidden="true">·</span>
        <a
          href="https://linkedin.com/in/shailenparmar"
          target="_blank"
          rel="noreferrer"
          className="contact-link"
        >
          linkedin
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
        {showResume && (
          <span className="contact-location">San Francisco, California</span>
        )}
      </div>

      {showResume && (
      <>
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
      </>
      )}

      {showResume && <TopButton />}
    </section>
  )
}
