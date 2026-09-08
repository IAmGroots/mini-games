import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Flag, Bomb, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Cell from "./Cell";
import { useMinesweeper } from "./useMinesweeper";

type Difficulty = "beginner" | "intermediate" | "expert";

export default function Minesweeper() {
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const {
    grid,
    isGameOver,
    isWon,
    flagCount,
    minesCount,
    timer,
    cols,
    revealCell,
    toggleFlag,
    resetGame,
  } = useMinesweeper(difficulty);

  const handleCellRightClick = (
    e: React.MouseEvent,
    row: number,
    col: number,
  ) => {
    e.preventDefault();
    toggleFlag(row, col);
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Minesweeper</h1>
            <Button variant="outline" onClick={resetGame}>
              <RotateCcw className="mr-2 h-4 w-4" />
              New Game
            </Button>
          </div>

          {/* Difficulty Selection */}
          <div className="mb-8 text-center">
            <p className="text-muted-foreground mb-4">Select Difficulty:</p>
            <div className="flex gap-4 justify-center">
              {(["beginner", "intermediate", "expert"] as const).map(
                (level) => (
                  <Button
                    key={level}
                    variant={difficulty === level ? "default" : "outline"}
                    onClick={() => handleDifficultyChange(level)}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Button>
                ),
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center justify-center">
                  <Bomb className="h-4 w-4 mr-1" />
                  Mines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-center">
                  {minesCount - flagCount}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center justify-center">
                  <Flag className="h-4 w-4 mr-1" />
                  Flags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-center">
                  {flagCount}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center justify-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-center">{timer}s</div>
              </CardContent>
            </Card>
          </div>

          {/* Win/Lose Message */}
          {(isWon || isGameOver) && (
            <div className="text-center mb-8">
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {isWon ? "🎉 You Won!" : "💥 Game Over!"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {isWon
                      ? `Congratulations! You cleared the minefield in ${timer} seconds.`
                      : "You hit a mine! Try again."}
                  </p>
                  <Badge className="text-lg px-4 py-2">Time: {timer}s</Badge>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Game Board */}
          <div className="flex justify-center mb-8 overflow-x-auto">
            <div
              className="inline-grid shrink-0 gap-0 border-2 border-slate-400 dark:border-slate-600"
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <Cell
                    key={`${rowIndex}-${colIndex}`}
                    value={cell.neighborMines}
                    isRevealed={cell.isRevealed}
                    isFlagged={cell.isFlagged}
                    isMine={cell.isMine}
                    isGameOver={isGameOver}
                    onClick={() => revealCell(rowIndex, colIndex)}
                    onRightClick={(e) =>
                      handleCellRightClick(e, rowIndex, colIndex)
                    }
                  />
                )),
              )}
            </div>
          </div>

          {/* Info */}
          <Card className="mt-8 w-fit mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">How to Play</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Left-click to reveal a cell</li>
                <li>Right-click (or long-press on mobile) to place a flag</li>
                <li>Numbers indicate how many mines are in adjacent cells</li>
                <li>Flag all mines without clicking on any to win</li>
                <li>The first click is always safe</li>
                <li>
                  <strong>Beginner:</strong> 10×10 grid, 10 mines
                </li>
                <li>
                  <strong>Intermediate:</strong> 16×16 grid, 32 mines
                </li>
                <li>
                  <strong>Expert:</strong> 24×24 grid, 50 mines
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
