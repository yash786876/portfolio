// Curated mate-in-1 puzzles. Every one of these has been verified with a
// throwaway script (chess.js: enumerate all legal moves from the FEN,
// confirm at least one results in isCheckmate()) before being included here.
export const PUZZLES = [
  { label: "Fool's Mate", fen: 'rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2' },
  { label: 'Queen corner mate', fen: '7k/Q7/5K2/8/8/8/8/8 w - - 0 1' },
  { label: 'Queen edge mate', fen: 'k7/7Q/1K6/8/8/8/8/8 w - - 0 1' },
  { label: 'Rook corner mate', fen: '7k/8/6K1/8/8/8/8/R7 w - - 0 1' },
  { label: 'Rook edge mate', fen: 'k7/8/1K6/8/8/8/8/7R w - - 0 1' },
  { label: 'Ladder mate (two rooks)', fen: '7k/R7/8/8/8/8/8/1R4K1 w - - 0 1' },
  { label: 'Smothered mate', fen: '6rk/6pp/3N4/8/8/8/8/K7 w - - 0 1' },
  { label: 'Back-rank mate (rook)', fen: '6k1/5ppp/8/8/8/8/1K6/R7 w - - 0 1' },
  { label: 'Back-rank mate (queen)', fen: '6k1/5ppp/8/8/8/8/1K6/Q7 w - - 0 1' },
]
