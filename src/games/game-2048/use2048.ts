import { useState, useEffect, useCallback } from "react";

type Direction = "up" | "down" | "left" | "right";

export function use2048() {
  const [grid, setGrid] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const initializeGame = () => {
    const newGrid = Array(4)
      .fill(0)
      .map(() => Array(4).fill(0));
    addRandomTile(newGrid);
    addRandomTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setIsGameOver(false);
    setHasWon(false);
  };

  const addRandomTile = (currentGrid: number[][]) => {
    const emptyCells: { row: number; col: number }[] = [];

    currentGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) {
          emptyCells.push({ row: rowIndex, col: colIndex });
        }
      });
    });

    if (emptyCells.length > 0) {
      const { row, col } =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      currentGrid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const moveLeft = (grid: number[][]): { grid: number[][]; score: number } => {
    let moveScore = 0;
    const newGrid = grid.map((row) => {
      const filtered = row.filter((cell) => cell !== 0);
      const merged: number[] = [];

      for (let i = 0; i < filtered.length; i++) {
        if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
          merged.push(filtered[i] * 2);
          moveScore += filtered[i] * 2;
          i++;
        } else {
          merged.push(filtered[i]);
        }
      }

      while (merged.length < 4) {
        merged.push(0);
      }

      return merged;
    });

    return { grid: newGrid, score: moveScore };
  };

  const rotate90 = (grid: number[][]): number[][] => {
    return grid[0].map((_, index) => grid.map((row) => row[index]).reverse());
  };

  const move = useCallback(
    (direction: Direction) => {
      setGrid((currentGrid) => {
        if (isGameOver) return currentGrid;

        let newGrid = currentGrid.map((row) => [...row]);
        let rotations = 0;

        // Rotate grid to convert all moves to left
        switch (direction) {
          case "left":
            rotations = 0;
            break;
          case "down":
            rotations = 1;
            break;
          case "right":
            rotations = 2;
            break;
          case "up":
            rotations = 3;
            break;
        }

        for (let i = 0; i < rotations; i++) {
          newGrid = rotate90(newGrid);
        }

        const { grid: movedGrid, score: moveScore } = moveLeft(newGrid);

        // Rotate back
        let finalGrid = movedGrid;
        for (let i = 0; i < 4 - rotations; i++) {
          finalGrid = rotate90(finalGrid);
        }

        // Check if move changed anything
        const hasChanged = !gridsEqual(currentGrid, finalGrid);

        if (hasChanged) {
          addRandomTile(finalGrid);
          setScore((prev) => prev + moveScore);

          // Check for 2048 tile
          if (!hasWon && finalGrid.some((row) => row.includes(2048))) {
            setHasWon(true);
          }

          // Check game over
          if (!canMove(finalGrid)) {
            setIsGameOver(true);
          }

          return finalGrid;
        }

        return currentGrid;
      });
    },
    [isGameOver, hasWon],
  );

  const gridsEqual = (grid1: number[][], grid2: number[][]): boolean => {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (grid1[row][col] !== grid2[row][col]) return false;
      }
    }
    return true;
  };

  const canMove = (grid: number[][]): boolean => {
    // Check if there are any empty cells
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (grid[row][col] === 0) return true;
      }
    }

    // Check horizontal merges
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        if (grid[row][col] === grid[row][col + 1]) return true;
      }
    }

    // Check vertical merges
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 3; row++) {
        if (grid[row][col] === grid[row + 1][col]) return true;
      }
    }

    return false;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const direction = e.key.replace("Arrow", "").toLowerCase() as Direction;
        move(direction);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  return {
    grid,
    score,
    isGameOver,
    hasWon,
    move,
    resetGame: initializeGame,
  };
}
