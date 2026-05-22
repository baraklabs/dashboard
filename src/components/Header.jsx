import { useState, useEffect, useRef } from 'react'

const TIME_RANGES = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Year to Date']

export default function Header({ timeRange, onTimeRangeChange }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    const id = setTimeout(() => document.addEventListener('click', handler), 100)
    return () => {
      clearTimeout(id)
      document.removeEventListener('click', handler)
    }
  }, [open])

  return (
    <header>
      <h1>Sales Dashboard</h1>
      <div className="date-range" ref={containerRef}>
        <span>{timeRange}</span>
        <button onClick={() => setOpen((o) => !o)}>▼</button>
        {open && (
          <div className="date-dropdown">
            <ul>
              {TIME_RANGES.map((range) => (
                <li
                  key={range}
                  onClick={() => {
                    onTimeRangeChange(range)
                    setOpen(false)
                  }}
                >
                  {range}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
