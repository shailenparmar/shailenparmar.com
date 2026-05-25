import { useEffect, useRef, useState } from 'react'
import './Colorways.css'

// Standalone port of the good days "colorways" picker: a 2x2 grid of squares
// (text SL / bg SL / text hue / bg hue) that recolors this site live via the
// --fg and --bg CSS variables. No external state/deps — purely local.

type HSL = { h: number; s: number; l: number }

const hsl = ({ h, s, l }: HSL) => `hsl(${h}, ${s}%, ${l}%)`

// The 5 standard good days presets (text / background).
const PRESETS: { text: HSL; bg: HSL }[] = [
  { text: { h: 0, s: 0, l: 100 }, bg: { h: 0, s: 0, l: 0 } },
  { text: { h: 242, s: 83, l: 43 }, bg: { h: 271, s: 100, l: 71 } },
  { text: { h: 210, s: 61, l: 14 }, bg: { h: 21, s: 70, l: 55 } },
  { text: { h: 210, s: 100, l: 43 }, bg: { h: 132, s: 100, l: 79 } },
  { text: { h: 63, s: 100, l: 12 }, bg: { h: 52, s: 100, l: 91 } },
]

function PickerSquare({
  part,
  value,
  dotColor,
  onChange,
}: {
  part: 'sl' | 'hue'
  value: HSL
  dotColor: string
  onChange: (partial: Partial<HSL>) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)

  const startDrag = (clientX: number, clientY: number) => {
    setDragging(true)
    const update = (cx: number, cy: number) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (part === 'sl') {
        const x = Math.max(0, Math.min(cx - rect.left, rect.width))
        const y = Math.max(0, Math.min(cy - rect.top, rect.height))
        onChange({
          s: Math.round((x / rect.width) * 100),
          l: Math.round(100 - (y / rect.height) * 100),
        })
      } else {
        const y = Math.max(0, Math.min(cy - rect.top, rect.height))
        onChange({ h: Math.round((1 - y / rect.height) * 360) })
      }
    }
    update(clientX, clientY)
    const move = (e: MouseEvent | TouchEvent) => {
      const pt = 'touches' in e ? e.touches[0] : e
      if (pt) update(pt.clientX, pt.clientY)
      if ('touches' in e) e.preventDefault()
    }
    const up = () => {
      setDragging(false)
      document.removeEventListener('mousemove', move as EventListener)
      document.removeEventListener('mouseup', up)
      document.removeEventListener('touchmove', move as EventListener)
      document.removeEventListener('touchend', up)
    }
    document.addEventListener('mousemove', move as EventListener)
    document.addEventListener('mouseup', up)
    document.addEventListener('touchmove', move as EventListener, { passive: false })
    document.addEventListener('touchend', up)
  }

  const onMouseDown = (e: React.MouseEvent) => startDrag(e.clientX, e.clientY)
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    if (t) startDrag(t.clientX, t.clientY)
  }

  if (part === 'hue') {
    return (
      <div
        ref={ref}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        className="cw-square"
        style={{
          zIndex: dragging ? 10 : 1,
          background:
            'linear-gradient(to top, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))',
        }}
      >
        <div
          className="cw-needle"
          style={{ top: `${((360 - value.h) / 360) * 100}%`, height: dragging ? 16 : 4 }}
        />
      </div>
    )
  }

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      className="cw-square cw-square-sl"
      style={{
        zIndex: dragging ? 10 : 2,
        background: `linear-gradient(to bottom, white, transparent 50%), linear-gradient(to top, black, transparent 50%), linear-gradient(to right, hsl(${value.h},0%,50%), hsl(${value.h},100%,50%))`,
      }}
    >
      <div
        className="cw-dot"
        style={{
          left: `${value.s}%`,
          top: `${100 - value.l}%`,
          width: dragging ? 32 : 16,
          height: dragging ? 32 : 16,
          backgroundColor: dotColor,
        }}
      />
    </div>
  )
}

const STORAGE_KEY = 'siteColors'

type Saved = { text: HSL; bg: HSL; active: number | null }

function loadSaved(): Saved | null {
  try {
    const c = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (c && c.text && c.bg) return c
  } catch {
    /* ignore */
  }
  return null
}

export default function Colorways() {
  const [text, setText] = useState<HSL>(() => loadSaved()?.text ?? { h: 0, s: 0, l: 100 })
  const [bg, setBg] = useState<HSL>(() => loadSaved()?.bg ?? { h: 195, s: 94, l: 10 })
  const [active, setActive] = useState<number | null>(() => loadSaved()?.active ?? null)

  // Apply to the whole site + persist so the choice propagates across every
  // page and survives reloads, until changed again.
  useEffect(() => {
    document.documentElement.style.setProperty('--fg', hsl(text))
  }, [text])
  useEffect(() => {
    document.documentElement.style.setProperty('--bg', hsl(bg))
  }, [bg])
  useEffect(() => {
    // Debounced so dragging doesn't hit synchronous localStorage every frame.
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ text, bg, active }))
      } catch {
        /* ignore */
      }
    }, 200)
    return () => clearTimeout(t)
  }, [text, bg, active])

  const textColor = hsl(text)
  const bgColor = hsl(bg)

  // Manual drags deselect any active preset (colors no longer match it).
  const changeText = (p: Partial<HSL>) => {
    setText((v) => ({ ...v, ...p }))
    setActive(null)
  }
  const changeBg = (p: Partial<HSL>) => {
    setBg((v) => ({ ...v, ...p }))
    setActive(null)
  }

  return (
    <div className="colorways">
      <div className="cw-body">
        <div className="cw-labels">
          <span>text</span>
          <span>background</span>
        </div>
        <div className="cw-grid">
          <PickerSquare part="hue" value={text} dotColor={bgColor} onChange={changeText} />
          <PickerSquare part="hue" value={bg} dotColor={textColor} onChange={changeBg} />
          <PickerSquare part="sl" value={text} dotColor={bgColor} onChange={changeText} />
          <PickerSquare part="sl" value={bg} dotColor={textColor} onChange={changeBg} />
        </div>
        <div className="cw-presets">
          {PRESETS.map((p, i) => {
            const selected = active === i
            return (
              <button
                key={i}
                type="button"
                className={`cw-preset${selected ? ' cw-preset-active' : ''}`}
                style={{
                  backgroundColor: hsl(p.bg),
                  color: hsl(p.text),
                  borderColor: hsl(p.text),
                }}
                onClick={() => {
                  setText(p.text)
                  setBg(p.bg)
                  setActive(i)
                }}
                aria-label={`colorway ${i + 1}`}
              >
                {i + 1}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
