import { Link } from 'react-router-dom'
import './Resume.css'

export default function Resume() {
  return (
    <section className="resume">
      <h1 className="page-title">resume</h1>
      <p className="resume-intro">
        a downloadable pdf will live here. for the full work history, see{' '}
        <Link to="/experience" className="inline-link">experience</Link>.
      </p>
      <div className="resume-placeholder">resume.pdf</div>
    </section>
  )
}
