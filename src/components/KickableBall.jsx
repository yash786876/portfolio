import { useEffect, useRef, useState } from 'react'
import './KickableBall.css'

const BALL_SIZE = 56
const FRICTION = 0.985
const WALL_BOUNCE = 0.65
const MIN_SPEED = 0.02

const CAPTIONS = [
  { max: 0.3, text: "That's a hold, not a buy." },
  { max: 1.2, text: 'Dollar-cost averaging this one.' },
  { max: 2.5, text: 'Steady, dividend-paying kick.' },
  { max: 4.5, text: 'Beating the benchmark.' },
  { max: 7, text: "Now we're talking growth stock." },
  { max: Infinity, text: 'IPO-day pop. Someone alert the LPs. 🚀' },
]

function captionFor(speed) {
  return CAPTIONS.find((c) => speed <= c.max).text
}

function KickableBall() {
  const fieldRef = useRef(null)
  const ballRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const vel = useRef({ x: 0, y: 0 })
  const dragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0, t: 0 })
  const lastPointer = useRef({ x: 0, y: 0, t: 0 })

  const [kicks, setKicks] = useState(0)
  const [bestSpeed, setBestSpeed] = useState(0)
  const [caption, setCaption] = useState('Drag the ball and let go to kick it.')

  useEffect(() => {
    const place = () => {
      const field = fieldRef.current
      if (!field) return
      const rect = field.getBoundingClientRect()
      pos.current = {
        x: rect.width / 2 - BALL_SIZE / 2,
        y: rect.height / 2 - BALL_SIZE / 2,
      }
      applyTransform()
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function applyTransform() {
    if (ballRef.current) {
      ballRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
    }
  }

  useEffect(() => {
    let raf
    const tick = () => {
      const field = fieldRef.current
      if (field && !dragging.current) {
        const rect = field.getBoundingClientRect()
        const maxX = rect.width - BALL_SIZE
        const maxY = rect.height - BALL_SIZE

        pos.current.x += vel.current.x
        pos.current.y += vel.current.y

        if (pos.current.x < 0) {
          pos.current.x = 0
          vel.current.x *= -WALL_BOUNCE
        } else if (pos.current.x > maxX) {
          pos.current.x = maxX
          vel.current.x *= -WALL_BOUNCE
        }
        if (pos.current.y < 0) {
          pos.current.y = 0
          vel.current.y *= -WALL_BOUNCE
        } else if (pos.current.y > maxY) {
          pos.current.y = maxY
          vel.current.y *= -WALL_BOUNCE
        }

        vel.current.x *= FRICTION
        vel.current.y *= FRICTION
        if (Math.hypot(vel.current.x, vel.current.y) < MIN_SPEED) {
          vel.current.x = 0
          vel.current.y = 0
        }
        applyTransform()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  function onPointerDown(e) {
    dragging.current = true
    vel.current = { x: 0, y: 0 }
    const t = performance.now()
    dragStart.current = { x: e.clientX, y: e.clientY, t }
    lastPointer.current = { x: e.clientX, y: e.clientY, t }
    ballRef.current?.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e) {
    if (!dragging.current) return
    const field = fieldRef.current
    if (!field) return
    const rect = field.getBoundingClientRect()
    pos.current.x = Math.min(Math.max(pos.current.x + (e.movementX || 0), 0), rect.width - BALL_SIZE)
    pos.current.y = Math.min(Math.max(pos.current.y + (e.movementY || 0), 0), rect.height - BALL_SIZE)
    applyTransform()
    lastPointer.current = { x: e.clientX, y: e.clientY, t: performance.now() }
  }

  function onPointerUp() {
    if (!dragging.current) return
    dragging.current = false

    const dt = Math.max(lastPointer.current.t - dragStart.current.t, 16)
    const dx = lastPointer.current.x - dragStart.current.x
    const dy = lastPointer.current.y - dragStart.current.y
    const scale = 14 / dt

    vel.current = { x: dx * scale, y: dy * scale }
    const speed = Math.hypot(vel.current.x, vel.current.y)

    setKicks((k) => k + 1)
    setBestSpeed((b) => Math.max(b, speed))
    setCaption(captionFor(speed))
  }

  return (
    <div className="widget-card">
      <div className="stat-row">
        <div className="stat">
          <span className="stat-value">{kicks}</span>
          <span className="stat-label">Kicks</span>
        </div>
        <div className="stat">
          <span className="stat-value">{bestSpeed.toFixed(1)}</span>
          <span className="stat-label">Best speed (unaudited)</span>
        </div>
      </div>

      <div className="field" ref={fieldRef}>
        <div className="field-lines" aria-hidden="true" />
        <div
          className="ball"
          ref={ballRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          role="button"
          tabIndex={0}
          aria-label="Draggable football"
        >
          ⚽
        </div>
      </div>

      <p className="caption">{caption}</p>
    </div>
  )
}

export default KickableBall
