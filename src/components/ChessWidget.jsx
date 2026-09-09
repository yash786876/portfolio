import { useMemo, useRef, useState } from 'react'
import { Chess } from 'chess.js'
import { MATE_IN_1, MATE_IN_2 } from './chessPuzzles.js'
import './ChessWidget.css'

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1]

const PIECE_GLYPH = {
  w: { p: '♙', n: '♘', b: '♗', r: '♖', q: '♕', k: '♔' },
  b: { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚' },
}

const SETS = {
  mate1: { puzzles: MATE_IN_1, label: 'Mate in 1' },
  mate2: { puzzles: MATE_IN_2, label: 'Mate in 2' },
}

function firstMateMove(chess) {
  for (const m of chess.moves({ verbose: true })) {
    chess.move({ from: m.from, to: m.to, promotion: m.promotion || 'q' })
    const mate = chess.isCheckmate()
    chess.undo()
    if (mate) return m
  }
  return null
}

// After a move that puts it on `chess`'s side-to-move, checks whether every
// legal reply still leaves the OTHER side with a mate-in-1 available.
function everyReplyAllowsMate(chess) {
  const replies = chess.moves({ verbose: true })
  if (replies.length === 0) return false
  for (const reply of replies) {
    chess.move({ from: reply.from, to: reply.to, promotion: reply.promotion || 'q' })
    const mate = firstMateMove(chess)
    chess.undo()
    if (!mate) return false
  }
  return true
}

function ChessWidget() {
  const [mode, setMode] = useState('mate1')
  const gameRef = useRef(new Chess(MATE_IN_1[0].fen))
  const [fen, setFen] = useState(() => MATE_IN_1[0].fen)
  const [selected, setSelected] = useState(null)
  const [puzzleIndex, setPuzzleIndex] = useState(0)
  const [solved, setSolved] = useState(0)
  const [stage, setStage] = useState('first') // first | second (mate-in-2 only)
  const [msg, setMsg] = useState('Find the checkmate in one move.')

  const view = useMemo(() => new Chess(fen), [fen])

  const legalTargets = useMemo(() => {
    if (!selected) return []
    return view.moves({ square: selected, verbose: true }).map((m) => m.to)
  }, [selected, view])

  function refresh() {
    setFen(gameRef.current.fen())
  }

  function currentPuzzles() {
    return SETS[mode].puzzles
  }

  function loadPuzzle(i, nextMode = mode) {
    gameRef.current.load(SETS[nextMode].puzzles[i].fen)
    setSelected(null)
    setStage('first')
    setMsg(nextMode === 'mate2' ? 'Find the forcing first move.' : 'Find the checkmate in one move.')
    refresh()
  }

  function switchMode(next) {
    if (next === mode) return
    setMode(next)
    setPuzzleIndex(0)
    setSolved(0)
    loadPuzzle(0, next)
  }

  function resetPuzzle() {
    loadPuzzle(puzzleIndex)
  }

  function nextPuzzle() {
    const total = currentPuzzles().length
    const next = (puzzleIndex + 1) % total
    setPuzzleIndex(next)
    loadPuzzle(next)
  }

  function handleSquareClick(square) {
    const piece = view.get(square)

    if (!(selected && legalTargets.includes(square))) {
      if (piece && piece.color === view.turn()) {
        setSelected(square)
      } else {
        setSelected(null)
      }
      return
    }

    // a legal move to `square` from `selected` is being played
    if (mode === 'mate1' || stage === 'second') {
      gameRef.current.move({ from: selected, to: square, promotion: 'q' })
      if (gameRef.current.isCheckmate()) {
        setSolved((s) => s + 1)
        setMsg('Mate! Nicely spotted.')
      } else {
        setMsg('Not mate — reloading the puzzle. Try again.')
        resetPuzzle()
        return
      }
    } else {
      // mate-in-2, first move
      gameRef.current.move({ from: selected, to: square, promotion: 'q' })
      if (everyReplyAllowsMate(gameRef.current)) {
        const replies = gameRef.current.moves({ verbose: true })
        const reply = replies[Math.floor(Math.random() * replies.length)]
        gameRef.current.move({ from: reply.from, to: reply.to, promotion: reply.promotion || 'q' })
        setStage('second')
        setMsg('Good — that forces it. Now find the mate.')
      } else {
        setMsg('Not forcing — black has an escape. Try again.')
        resetPuzzle()
        return
      }
    }
    setSelected(null)
    refresh()
  }

  const board = view.board()
  const total = currentPuzzles().length

  return (
    <div className="widget-card chess-widget">
      <div className="chess-tabs">
        <button
          type="button"
          className={mode === 'mate1' ? 'chess-tab active' : 'chess-tab'}
          onClick={() => switchMode('mate1')}
        >
          Mate in 1
        </button>
        <button
          type="button"
          className={mode === 'mate2' ? 'chess-tab active' : 'chess-tab'}
          onClick={() => switchMode('mate2')}
        >
          Mate in 2
        </button>
      </div>

      <div className="chess-board" role="grid" aria-label="Chess board">
        {RANKS.map((rank) =>
          FILES.map((file) => {
            const square = `${file}${rank}`
            const cell = board[8 - rank][FILES.indexOf(file)]
            const isDark = (FILES.indexOf(file) + rank) % 2 === 0
            const isSelected = selected === square
            const isTarget = legalTargets.includes(square)
            return (
              <button
                type="button"
                key={square}
                className={`chess-sq${isDark ? ' dark' : ' light'}${isSelected ? ' selected' : ''}${isTarget ? ' target' : ''}`}
                onClick={() => handleSquareClick(square)}
              >
                {cell && (
                  <span className={`chess-piece piece-${cell.color}`}>
                    {PIECE_GLYPH[cell.color][cell.type]}
                  </span>
                )}
                {isTarget && !cell && <span className="chess-dot" />}
              </button>
            )
          }),
        )}
      </div>

      <div className="chess-footer">
        <p className="caption">{msg}</p>
        <div className="chess-puzzle-row">
          <span className="chess-puzzle-count">
            {SETS[mode].label} · Puzzle {puzzleIndex + 1}/{total} · Solved {solved}
          </span>
          <button type="button" className="widget-btn" onClick={nextPuzzle}>
            Next puzzle
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChessWidget
