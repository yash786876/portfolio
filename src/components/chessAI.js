// A small negamax + alpha-beta bot. Not a real engine — just enough to
// avoid hanging pieces and take a mate when it sees one, at a depth that
// stays snappy in a browser tab.
const VALUES = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 }
const SEARCH_DEPTH = 3

function evaluate(chess) {
  let score = 0
  for (const row of chess.board()) {
    for (const sq of row) {
      if (!sq) continue
      score += sq.color === 'w' ? VALUES[sq.type] : -VALUES[sq.type]
    }
  }
  if (chess.isCheckmate()) {
    score += chess.turn() === 'w' ? -100000 : 100000
  }
  return score
}

function negamax(chess, depth, alpha, beta, sign) {
  if (depth === 0 || chess.isGameOver()) {
    return sign * evaluate(chess)
  }
  let best = -Infinity
  for (const m of chess.moves({ verbose: true })) {
    chess.move({ from: m.from, to: m.to, promotion: m.promotion || 'q' })
    const score = -negamax(chess, depth - 1, -beta, -alpha, -sign)
    chess.undo()
    if (score > best) best = score
    if (best > alpha) alpha = best
    if (alpha >= beta) break
  }
  return best
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function findBotMove(chess) {
  const sign = chess.turn() === 'w' ? 1 : -1
  let bestScore = -Infinity
  let bestMove = null
  for (const m of shuffle(chess.moves({ verbose: true }))) {
    chess.move({ from: m.from, to: m.to, promotion: m.promotion || 'q' })
    const score = -negamax(chess, SEARCH_DEPTH - 1, -Infinity, Infinity, -sign)
    chess.undo()
    if (score > bestScore) {
      bestScore = score
      bestMove = m
    }
  }
  return bestMove
}
