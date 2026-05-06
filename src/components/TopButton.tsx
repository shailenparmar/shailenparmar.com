export default function TopButton() {
  return (
    <div className="top-btn-wrap">
      <button
        type="button"
        className="top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑ top
      </button>
    </div>
  )
}
