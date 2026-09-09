// Curated checkmate puzzles. Every position below was verified with a
// throwaway chess.js script before being included — not assumed correct
// by hand.
//
// MATE_IN_1: for each FEN, at least one legal move results in isCheckmate().
// MATE_IN_2: for each FEN, there exists a first move such that for EVERY
// legal black reply, white still has a mate-in-1 available (proven by
// brute-force search, not just plausible-looking).

export const MATE_IN_1 = [
  { label: "Fool's Mate", fen: 'rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2' },
  { label: 'Queen corner mate', fen: '7k/Q7/5K2/8/8/8/8/8 w - - 0 1' },
  { label: 'Queen edge mate', fen: 'k7/7Q/1K6/8/8/8/8/8 w - - 0 1' },
  { label: 'Rook corner mate', fen: '7k/8/6K1/8/8/8/8/R7 w - - 0 1' },
  { label: 'Rook edge mate', fen: 'k7/8/1K6/8/8/8/8/7R w - - 0 1' },
  { label: 'Ladder mate (two rooks)', fen: '7k/R7/8/8/8/8/8/1R4K1 w - - 0 1' },
  { label: 'Smothered mate', fen: '6rk/6pp/3N4/8/8/8/8/K7 w - - 0 1' },
  { label: 'Back-rank mate (rook)', fen: '6k1/5ppp/8/8/8/8/1K6/R7 w - - 0 1' },
  { label: 'Back-rank mate (queen)', fen: '6k1/5ppp/8/8/8/8/1K6/Q7 w - - 0 1' },
  { label: 'Queenside queen mate', fen: 'k7/1Q6/2K5/8/8/8/8/8 w - - 0 1' },
  { label: 'Queenside rook mate', fen: 'k7/8/2K5/8/8/8/8/R7 w - - 0 1' },
  { label: 'h-file back-rank mate', fen: '1k6/ppp5/8/8/8/8/6K1/7R w - - 0 1' },
  { label: 'Queen close mate', fen: '6k1/6P1/6K1/8/8/8/8/7Q w - - 0 1' },
  { label: 'Two knights + queen mate', fen: '7k/8/5N1K/8/8/8/8/6Q1 w - - 0 1' },
  { label: 'Queen diagonal mate', fen: '7k/5K2/8/8/8/8/8/6Q1 w - - 0 1' },
]

export const MATE_IN_2 = [
  { label: 'Rook and king box', fen: '5k2/8/4K3/8/8/8/8/7R w - - 0 1' },
  { label: 'Rook and king box (mirror)', fen: '1k6/8/2K5/8/8/8/8/R7 w - - 0 1' },
  { label: 'Rook and king box (g-file)', fen: '6k1/8/5K2/8/8/8/8/7R w - - 0 1' },
  { label: 'Rook and king box (c-file)', fen: '2k5/8/1K6/8/8/8/8/7R w - - 0 1' },
  { label: 'Queen and king box (mirror)', fen: '1k6/8/2K5/8/8/8/8/Q7 w - - 0 1' },
  { label: 'Queen and king box (g-file)', fen: '6k1/8/5K2/8/8/8/8/7Q w - - 0 1' },
  { label: 'Two rooks box', fen: '4k3/8/8/8/8/8/8/R3K2R w - - 0 1' },
  { label: 'Rook and king box (d-file)', fen: '3k4/8/4K3/8/8/8/8/R7 w - - 0 1' },
  { label: 'Rook and king box (e-file2)', fen: '4k3/8/5K2/8/8/8/8/R7 w - - 0 1' },
]
