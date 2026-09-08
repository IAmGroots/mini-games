import { useState, useEffect } from "react";

type Player = "X" | "O";
type Square = Player | null;

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

export function useTicTacToe() {
  const [squares, setSquares] = useState<Square[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [draws, setDraws] = useState(0);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  // AI move
  useEffect(() => {
    if (!isXNext && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const bestMove = getBestMove(squares);
        if (bestMove !== -1) {
          handleClick(bestMove);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, winner, isDraw]);

  function calculateWinner(
    squares: Square[],
  ): { winner: Player; line: number[] } | null {
    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a]!, line };
      }
    }
    return null;
  }

  function handleClick(index: number) {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const result = calculateWinner(newSquares);
    if (result) {
      setWinningLine(result.line);
      if (result.winner === "X") {
        setXScore((prev) => prev + 1);
      } else {
        setOScore((prev) => prev + 1);
      }
    } else if (newSquares.every((square) => square !== null)) {
      setDraws((prev) => prev + 1);
    }
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine(null);
  }

  function resetScores() {
    setXScore(0);
    setOScore(0);
    setDraws(0);
    resetGame();
  }

  // Minimax Algorithm for AI
  function minimax(
    board: Square[],
    depth: number,
    isMaximizing: boolean,
  ): number {
    const result = calculateWinner(board);

    if (result) {
      return result.winner === "O" ? 10 - depth : depth - 10;
    }

    if (board.every((square) => square !== null)) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = "O";
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = "X";
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  function getBestMove(board: Square[]): number {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        const score = minimax(board, 0, false);
        board[i] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  }

  return {
    squares,
    isXNext,
    winner: winner?.winner || null,
    winningLine,
    isDraw,
    xScore,
    oScore,
    draws,
    handleClick,
    resetGame,
    resetScores,
  };
}
