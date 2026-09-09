import { useEffect, useRef, useState } from 'react'
import './ScribbleChart.css'

const UP_COLOR = '#22c55e'
const DOWN_COLOR = '#ef4444'
const FLAT_COLOR = '#6b5bff'

function verdictFor(startY, endY, height) {
  const delta = startY - endY // canvas y grows downward, so up on screen = positive delta
  const threshold = height * 0.04
  if (delta > threshold) return { text: 'New ATH 📈', color: UP_COLOR }
  if (delta < -threshold) return { text: 'You crashed the market 📉', color: DOWN_COLOR }
  return { text: 'Sideways chop — very on-brand for a hold.', color: FLAT_COLOR }
}

function ScribbleChart() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const drawing = useRef(false)
  const firstPoint = useRef(null)
  const lastPoint = useRef(null)

  const [caption, setCaption] = useState('Drag across the chart to plot your own price line.')

  function sizeCanvas() {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const rect = wrap.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 3
    ctxRef.current = ctx
  }

  useEffect(() => {
    sizeCanvas()
    window.addEventListener('resize', sizeCanvas)
    return () => window.removeEventListener('resize', sizeCanvas)
  }, [])

  function pointFromEvent(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function onPointerDown(e) {
    const ctx = ctxRef.current
    if (!ctx) return
    drawing.current = true
    canvasRef.current.setPointerCapture(e.pointerId)
    const p = pointFromEvent(e)
    firstPoint.current = p
    lastPoint.current = p
    setCaption('Drawing…')
  }

  function onPointerMove(e) {
    if (!drawing.current) return
    const ctx = ctxRef.current
    const p = pointFromEvent(e)
    const last = lastPoint.current
    ctx.strokeStyle = p.y <= last.y ? UP_COLOR : DOWN_COLOR
    ctx.beginPath()
    ctx.moveTo(last.x, last.y)
    ctx.lineTo(p.x, p.y)
    ctx.stroke()
    lastPoint.current = p
  }

  function onPointerUp() {
    if (!drawing.current) return
    drawing.current = false
    const wrap = wrapRef.current
    const height = wrap ? wrap.getBoundingClientRect().height : 200
    const result = verdictFor(firstPoint.current.y, lastPoint.current.y, height)
    setCaption(result.text)
  }

  function clearChart() {
    const ctx = ctxRef.current
    const canvas = canvasRef.current
    if (!ctx || !canvas) return
    const dpr = window.devicePixelRatio || 1
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
    setCaption('Drag across the chart to plot your own price line.')
  }

  return (
    <div className="widget-card">
      <div className="chart-header">
        <p className="prose chart-intro">Scribble the market. Up is up, down is down — no due diligence required.</p>
        <button type="button" className="chart-clear" onClick={clearChart}>
          Clear
        </button>
      </div>
      <div className="chart-wrap" ref={wrapRef}>
        <canvas
          ref={canvasRef}
          className="chart-canvas"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        />
      </div>
      <p className="caption">{caption}</p>
    </div>
  )
}

export default ScribbleChart
