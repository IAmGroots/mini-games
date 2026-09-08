import { useState, useEffect } from "react";

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

type Difficulty = "beginner" | "intermediate" | "expert";

const DIFFICULTY_SETTINGS = {
  beginner: { rows: 10, cols: 10, mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 32 },
  expert: { rows: 24, cols: 24, mines: 50 },
};

export function useMinesweeper(difficulty: Difficulty = "beginner") {
  const settings = DIFFICULTY_SETTINGS[difficulty];
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [flagCount, setFlagCount] = useState(0);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    initializeGrid();
  }, [difficulty]);

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTimerRunning]);

  const initializeGrid = () => {
    const newGrid: Cell[][] = [];
    for (let row = 0; row < settings.rows; row++) {
      newGrid[row] = [];
      for (let col = 0; col < settings.cols; col++) {
        newGrid[row][col] = {
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0,
        };
      }
    }
    setGrid(newGrid);
    setIsGameOver(false);
    setIsWon(false);
    setFlagCount(0);
    setIsFirstClick(true);
    setTimer(0);
    setIsTimerRunning(false);
  };

  const placeMines = (excludeRow: number, excludeCol: number) => {
    let minesPlaced = 0;
    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));

    while (minesPlaced < settings.mines) {
      const row = Math.floor(Math.random() * settings.rows);
      const col = Math.floor(Math.random() * settings.cols);

      if (
        (!newGrid[row][col].isMine &&
          !(row === excludeRow && col === excludeCol) &&
          Math.abs(row - excludeRow) > 1) ||
        Math.abs(col - excludeCol) > 1
      ) {
        newGrid[row][col].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbor mines
    for (let row = 0; row < settings.rows; row++) {
      for (let col = 0; col < settings.cols; col++) {
        if (!newGrid[row][col].isMine) {
          newGrid[row][col].neighborMines = countNeighborMines(
            newGrid,
            row,
            col,
          );
        }
      }
    }

    setGrid(newGrid);
    return newGrid;
  };

  const countNeighborMines = (
    grid: Cell[][],
    row: number,
    col: number,
  ): number => {
    let count = 0;
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (
          r >= 0 &&
          r < settings.rows &&
          c >= 0 &&
          c < settings.cols &&
          grid[r][c].isMine
        ) {
          count++;
        }
      }
    }
    return count;
  };

  const revealCell = (row: number, col: number) => {
    if (isGameOver || isWon) return;

    let currentGrid = grid;

    if (isFirstClick) {
      currentGrid = placeMines(row, col);
      setIsFirstClick(false);
      setIsTimerRunning(true);
    }

    if (currentGrid[row][col].isRevealed || currentGrid[row][col].isFlagged)
      return;

    const newGrid = currentGrid.map((r) => r.map((cell) => ({ ...cell })));

    if (newGrid[row][col].isMine) {
      // Game over - reveal all mines
      for (let r = 0; r < settings.rows; r++) {
        for (let c = 0; c < settings.cols; c++) {
          if (newGrid[r][c].isMine) {
            newGrid[r][c].isRevealed = true;
          }
        }
      }
      setIsGameOver(true);
      setIsTimerRunning(false);
      setGrid(newGrid);
      return;
    }

    // Reveal cell and neighbors if no adjacent mines
    const revealRecursive = (r: number, c: number) => {
      if (
        r < 0 ||
        r >= settings.rows ||
        c < 0 ||
        c >= settings.cols ||
        newGrid[r][c].isRevealed ||
        newGrid[r][c].isFlagged
      ) {
        return;
      }

      newGrid[r][c].isRevealed = true;

      if (newGrid[r][c].neighborMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            revealRecursive(r + dr, c + dc);
          }
        }
      }
    };

    revealRecursive(row, col);
    setGrid(newGrid);

    // Check win condition
    checkWin(newGrid);
  };

  const toggleFlag = (row: number, col: number) => {
    if (isGameOver || isWon || grid[row][col].isRevealed) return;

    const newGrid = grid.map((r) => r.map((cell) => ({ ...cell })));
    newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
    setGrid(newGrid);
    setFlagCount((prev) => (newGrid[row][col].isFlagged ? prev + 1 : prev - 1));
  };

  const checkWin = (currentGrid: Cell[][]) => {
    let revealedCount = 0;
    for (let row = 0; row < settings.rows; row++) {
      for (let col = 0; col < settings.cols; col++) {
        if (currentGrid[row][col].isRevealed && !currentGrid[row][col].isMine) {
          revealedCount++;
        }
      }
    }

    const totalSafeCells = settings.rows * settings.cols - settings.mines;
    if (revealedCount === totalSafeCells) {
      setIsWon(true);
      setIsTimerRunning(false);
    }
  };

  return {
    grid,
    isGameOver,
    isWon,
    flagCount,
    minesCount: settings.mines,
    timer,
    rows: settings.rows,
    cols: settings.cols,
    revealCell,
    toggleFlag,
    resetGame: initializeGrid,
  };
}
