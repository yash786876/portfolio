import { useState } from 'react'
import './Accordion.css'

function Accordion({ id, title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div id={id} className={`accordion${open ? ' accordion-open' : ''}`}>
      <button
        type="button"
        className="accordion-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className="accordion-chevron" aria-hidden="true">▾</span>
      </button>
      {open && <div className="accordion-panel">{children}</div>}
    </div>
  )
}

export default Accordion
