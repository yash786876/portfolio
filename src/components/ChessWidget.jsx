import { useMemo, useRef, useState } from 'react'
import { Chess } from 'chess.js'
import { findBotMove } from './chessAI.js'
import { PUZZLES } from './chessPuzzles.js'
import './ChessWidget.css'

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1]

const PIECE_GLYPH = {
  w: { p: '♙', n: '♘', b: '♗', r: '♖', q: '♕', k: '♔' },
  b: { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚' },
}

function statusFor(chess, { thinking } = {}) {
  if (thinking) return 'Bot is thinking…'
  if (chess.isCheckmate()) return `Checkmate — ${chess.turn() === 'w' ? 'Black' : 'White'} wins.`
  if (chess.isStalemate()) return 'Stalemate.'
  if (chess.isDraw()) return 'Draw.'
  if (chess.isCheck()) return `${chess.turn() === 'w' ? 'White' : 'Black'} to move — check!`
  return `${chess.turn() === 'w' ? 'White' : 'Black'} to move.`
}

function ChessWidget() {
  const [mode, setMode] = useState('play') // play | puzzle
  const gameRef = useRef(new Chess())
  const [fen, setFen] = useState(() => new Chess().fen())
  const [selected, setSelected] = useState(null)
  const [thinking, setThinking] = useState(false)
  const [puzzleIndex, setPuzzleIndex] = useState(0)
  const [solved, setSolved] = useState(0)
  const [puzzleMsg, setPuzzleMsg] = useState('Find the checkmate in one move.')

  // Read-only view of the current position, derived purely from `fen` — the
  // mutable game instance (gameRef) is only ever touched inside handlers.
  const view = useMemo(() => new Chess(fen), [fen])

  const legalTargets = useMemo(() => {
    if (!selected) return []
    return view.moves({ square: selected, verbose: true }).map((m) => m.to)
  }, [selected, view])

  function refresh() {
    setFen(gameRef.current.fen())
  }

  function newGame() {
    gameRef.current.reset()
    setSelected(null)
    setThinking(false)
    refresh()
  }

  function loadPuzzle(i) {
    gameRef.current.load(PUZZLES[i].fen)
    setSelected(null)
    setPuzzleMsg('Find the checkmate in one move.')
    refresh()
  }

  function switchMode(next) {
    setMode(next)
    setSelected(null)
    setThinking(false)
    if (next === 'puzzle') {
      loadPuzzle(puzzleIndex)
    } else {
      newGame()
    }
  }

  function playBotMove() {
    setThinking(true)
    setTimeout(() => {
      const move = findBotMove(gameRef.current)
      if (move) {
        gameRef.current.move({ from: move.from, to: move.to, promotion: move.promotion || 'q' })
      }
      setThinking(false)
      refresh()
    }, 250)
  }

  function handleSquareClick(square) {
    if (thinking) return
    const piece = view.get(square)

    if (mode === 'puzzle') {
      if (selected && legalTargets.includes(square)) {
        gameRef.current.move({ from: selected, to: square, promotion: 'q' })
        if (gameRef.current.isCheckmate()) {
          setSolved((s) => s + 1)
          setPuzzleMsg('Mate! Nicely spotted.')
        } else {
          setPuzzleMsg('Not mate — reloading the puzzle. Try again.')
          gameRef.current.load(PUZZLES[puzzleIndex].fen)
        }
        setSelected(null)
        refresh()
        return
      }
      if (piece && piece.color === view.turn()) {
        setSelected(square)
      } else {
        setSelected(null)
      }
      return
    }

    // play mode
    if (selected && legalTargets.includes(square)) {
      gameRef.current.move({ from: selected, to: square, promotion: 'q' })
      setSelected(null)
      refresh()
      if (!gameRef.current.isGameOver()) {
        playBotMove()
      }
      return
    }
    if (piece && piece.color === view.turn() && piece.color === 'w') {
      setSelected(square)
    } else {
      setSelected(null)
    }
  }

  const board = view.board()

  return (
    <div className="widget-card chess-widget">
      <div className="chess-tabs">
        <button
          type="button"
          className={mode === 'play' ? 'chess-tab active' : 'chess-tab'}
          onClick={() => switchMode('play')}
        >
          Play vs Bot
        </button>
        <button
          type="button"
          className={mode === 'puzzle' ? 'chess-tab active' : 'chess-tab'}
          onClick={() => switchMode('puzzle')}
        >
          Mate Puzzles
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

      {mode === 'play' ? (
        <div className="chess-footer">
          <p className="caption">{statusFor(view, { thinking })}</p>
          <button type="button" className="chess-btn" onClick={newGame}>
            New game
          </button>
        </div>
      ) : (
        <div className="chess-footer">
          <p className="caption">{puzzleMsg}</p>
          <div className="chess-puzzle-row">
            <span className="chess-puzzle-count">
              Puzzle {puzzleIndex + 1}/{PUZZLES.length} · Solved {solved}
            </span>
            <button
              type="button"
              className="chess-btn"
              onClick={() => {
                const next = (puzzleIndex + 1) % PUZZLES.length
                setPuzzleIndex(next)
                loadPuzzle(next)
              }}
            >
              Next puzzle
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChessWidget
