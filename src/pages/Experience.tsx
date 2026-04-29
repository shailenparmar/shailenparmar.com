import './Resume.css'

type Job = {
  company: string
  location: string
  role: string
  start: string
  end: string
  bullets: string[]
}

const jobs: Job[] = [
  {
    company: 'Shelton School',
    location: 'Dallas',
    role: 'Substitute Teacher',
    start: 'Nov 2023',
    end: 'Jan 2026',
    bullets: [
      'Work with neurodivergent students; manage instruction and behavior across grade levels.',
    ],
  },
  {
    company: 'Meta',
    location: 'San Francisco',
    role: 'Content Strategist',
    start: 'Aug 2021',
    end: 'Nov 2022',
    bullets: [
      'Led WhatsApp Help Center redesign.',
      'Published 30+ articles reaching ~15M views per month, translated into 33 languages.',
    ],
  },
  {
    company: 'Project Arts',
    location: 'Durham, NC',
    role: 'Program Director',
    start: 'Aug 2019',
    end: 'Aug 2021',
    bullets: [
      'Managed a 10-day program with 36 participants on a $12K budget.',
    ],
  },
  {
    company: 'Academy of Model Aeronautics',
    location: 'Durham, NC',
    role: 'Vice President',
    start: 'Jan 2018',
    end: 'May 2021',
    bullets: [
      'Organized the Pro Pilots Invitational on a $7K budget.',
      'Taught flying courses; managed a $15K club budget.',
    ],
  },
]

const skills = ['Figma', 'GitHub', 'Claude Code', 'GSuite']

export default function Experience() {
  return (
    <section className="resume">
      <h1 className="page-title">experience</h1>

      <div className="contact">
        <a href="mailto:shailenparmar@gmail.com">shailenparmar@gmail.com</a>
        <span className="dot" aria-hidden="true">·</span>
        <a href="tel:+12146738233">214.673.8233</a>
        <span className="dot" aria-hidden="true">·</span>
        <a href="https://linkedin.com/in/shailenparmar" target="_blank" rel="noreferrer">
          linkedin.com/in/shailenparmar
        </a>
      </div>

      <h2 className="section-heading">work</h2>
      <ul className="job-list">
        {jobs.map((job) => (
          <li key={job.company} className="job">
            <div className="job-head">
              <div>
                <div className="job-company">{job.company}</div>
                <div className="job-role">{job.role}</div>
              </div>
              <div className="job-meta">
                <div>{job.location}</div>
                <div>{job.start} — {job.end}</div>
              </div>
            </div>
            <ul className="job-bullets">
              {job.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h2 className="section-heading">education</h2>
      <div className="edu">
        <div className="job-company">Duke University</div>
        <div className="job-role">Trinity College of Arts and Sciences · Class of 2021</div>
        <div className="job-meta-inline">B.S. in Neuroscience and Visual &amp; Media Studies · GPA 3.802</div>
      </div>

      <h2 className="section-heading">skills</h2>
      <ul className="skills">
        {skills.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </section>
  )
}
