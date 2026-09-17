import './FlowDiagram.css'

// A horizontal sequence of labeled steps connected by arrows — for
// process/pipeline-shaped explanations (a regulatory pathway, a build
// pipeline, a launch sequence, etc).
function FlowDiagram({ steps }) {
  const boxW = 104
  const gap = 18
  const boxH = 60
  const width = steps.length * boxW + (steps.length - 1) * gap
  const midY = boxH / 2

  return (
    <div className="flow-diagram-wrap">
      <svg
        className="flow-diagram"
        viewBox={`0 0 ${width} ${boxH}`}
        role="img"
        aria-label={`Flow diagram: ${steps.join(' → ')}`}
      >
        {steps.map((step, i) => {
          const x = i * (boxW + gap)
          return (
            <g key={i}>
              <rect x={x} y="0" width={boxW} height={boxH} rx="10" className="flow-box" />
              <foreignObject x={x} y="0" width={boxW} height={boxH}>
                <div className="flow-box-text">{step}</div>
              </foreignObject>
              {i < steps.length - 1 && (
                <g className="flow-arrow">
                  <line x1={x + boxW} y1={midY} x2={x + boxW + gap - 8} y2={midY} />
                  <polygon points={`${x + boxW + gap - 8},${midY - 5} ${x + boxW + gap},${midY} ${x + boxW + gap - 8},${midY + 5}`} />
                </g>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default FlowDiagram
