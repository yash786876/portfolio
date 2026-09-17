import { useState } from 'react'
import FlowDiagram from './FlowDiagram.jsx'
import StackDiagram from './StackDiagram.jsx'
import './ExpandableTopic.css'

function ExpandableTopic({ label, note, abstract, diagram }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`topic-card${open ? ' topic-open' : ''}`}>
      <button type="button" className="topic-trigger" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="topic-heading">
          <span className="topic-label">{label}</span>
          <span className="topic-note">{note}</span>
        </span>
        <span className="topic-caret" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="topic-detail">
          <p className="prose">{abstract}</p>
          {diagram?.type === 'flow' && <FlowDiagram steps={diagram.steps} />}
          {diagram?.type === 'stack' && <StackDiagram layers={diagram.layers} />}
        </div>
      )}
    </div>
  )
}

export default ExpandableTopic
