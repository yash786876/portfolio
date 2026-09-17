import './StackDiagram.css'

// A vertical stack of labeled layers connected by downward arrows — for
// architecture/infrastructure-shaped explanations (a tech stack, a supply
// chain, a network path).
function StackDiagram({ layers }) {
  const boxH = 44
  const gap = 22
  const width = 320
  const height = layers.length * boxH + (layers.length - 1) * gap

  return (
    <div className="stack-diagram-wrap">
      <svg
        className="stack-diagram"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Stack diagram: ${layers.join(' -> ')}`}
      >
        {layers.map((layer, i) => {
          const y = i * (boxH + gap)
          return (
            <g key={i}>
              <rect x="0" y={y} width={width} height={boxH} rx="10" className="stack-box" />
              <foreignObject x="0" y={y} width={width} height={boxH}>
                <div className="stack-box-text">{layer}</div>
              </foreignObject>
              {i < layers.length - 1 && (
                <g className="stack-arrow">
                  <line x1={width / 2} y1={y + boxH} x2={width / 2} y2={y + boxH + gap - 7} />
                  <polygon
                    points={`${width / 2 - 5},${y + boxH + gap - 7} ${width / 2},${y + boxH + gap} ${width / 2 + 5},${y + boxH + gap - 7}`}
                  />
                </g>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default StackDiagram
