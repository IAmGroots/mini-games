import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type Difficulty = "easy" | "medium" | "hard";
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
  const [difficulty, setDifficulty] = useLocalStorage<Difficulty>(
    "tictactoe-difficulty",
    "medium",
  );
  const [xScore, setXScore] = useLocalStorage<number>("tictactoe-xScore", 0);
  const [oScore, setOScore] = useLocalStorage<number>("tictactoe-oScore", 0);
  const [draws, setDraws] = useLocalStorage<number>("tictactoe-draws", 0);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  // AI move
  useEffect(() => {
    if (!isXNext && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const aiMove = getAiMove(squares, difficulty);
        if (aiMove !== -1) {
          handleClick(aiMove);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, winner, isDraw, difficulty]);

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

  function getEmptyIndices(board: Square[]): number[] {
    const empty: number[] = [];
    board.forEach((sq, idx) => {
      if (sq === null) empty.push(idx);
    });
    return empty;
  }

  function getRandomMove(board: Square[]): number {
    const empty = getEmptyIndices(board);
    if (empty.length === 0) return -1;
    return empty[Math.floor(Math.random() * empty.length)];
  }

  function getWinningOrBlockingMove(board: Square[], player: Player): number {
    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      const values = [board[a], board[b], board[c]];
      const playerMatches = values.filter((v) => v === player).length;
      const emptyMatches = values.filter((v) => v === null).length;

      if (playerMatches === 2 && emptyMatches === 1) {
        if (board[a] === null) return a;
        if (board[b] === null) return b;
        if (board[c] === null) return c;
      }
    }
    return -1;
  }

  function getAiMove(board: Square[], diff: Difficulty): number {
    if (diff === "easy") {
      // 80% completely random move, 20% block or win if available
      if (Math.random() < 0.2) {
        const winMove = getWinningOrBlockingMove(board, "O");
        if (winMove !== -1) return winMove;
      }
      return getRandomMove(board);
    }

    if (diff === "medium") {
      // 1. Prioritize immediate win
      const winMove = getWinningOrBlockingMove(board, "O");
      if (winMove !== -1) return winMove;

      // 2. Block player immediate win
      const blockMove = getWinningOrBlockingMove(board, "X");
      if (blockMove !== -1) return blockMove;

      // 3. 50% Minimax optimal, 50% random
      if (Math.random() < 0.5) {
        return getBestMove(board);
      }
      return getRandomMove(board);
    }

    // Hard: 100% Unbeatable Minimax
    return getBestMove(board);
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
    difficulty,
    setDifficulty,
    handleClick,
    resetGame,
    resetScores,
  };
}
