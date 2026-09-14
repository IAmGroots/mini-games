import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  RotateCcw,
  Flag,
  Bomb,
  Timer,
  HelpCircle,
  Play,
  Home,
  Trophy,
  Shovel,
  Move,
} from "lucide-react";
import confetti from "canvas-confetti";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card as UICard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Cell from "./Cell";
import { useMinesweeper } from "./useMinesweeper";
import { useGameScore } from "@/hooks/useGameScore";

type Difficulty = "beginner" | "intermediate" | "expert";

export default function Minesweeper() {
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const [mobileMode, setMobileMode] = useState<"dig" | "flag">("dig");
  const [cellScale, setCellScale] = useState<"fit" | "normal">("fit");
  const [showRules, setShowRules] = useState(false);

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

  const { addScore, getHighScore } = useGameScore("minesweeper");

  // Win celebration
  useEffect(() => {
    if (isWon) {
      const calculatedScore = Math.max(1000 - timer * 10, 100);
      addScore(calculatedScore, { time: timer });

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#f43f5e", "#f59e0b", "#10b981", "#3b82f6"],
      });
    }
  }, [isWon]);

  const handleCellClick = (row: number, col: number) => {
    if (mobileMode === "flag") {
      toggleFlag(row, col);
    } else {
      revealCell(row, col);
    }
  };

  const handleCellRightClick = (
    e: React.MouseEvent,
    row: number,
    col: number,
  ) => {
    e.preventDefault();
    toggleFlag(row, col);
  };

  const remainingMines = minesCount - flagCount;

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-rose-500/20">
      <Header />

      <main className="flex-1 container px-4 py-6 md:py-10 max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500 to-red-600 text-white shadow-md shadow-rose-500/20">
              <Bomb className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
                Minesweeper
              </h1>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden sm:block">
                Tactical Deduction
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowRules((prev) => !prev)}
              title="How to Play"
              className="rounded-xl"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetGame}
              className="gap-2 rounded-xl font-bold hover:border-rose-500/50"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
        </div>

        {/* Collapsible Rules Bar */}
        {showRules && (
          <div className="mb-6 p-4 rounded-2xl border border-border/80 bg-card/90 backdrop-blur animate-pop-in">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-primary" />
                How to Play
              </span>
              <button
                onClick={() => setShowRules(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>
                Click to reveal cells; right-click (or use Flag mode) to mark
                suspicious spots.
              </li>
              <li>
                Numbered cells show how many mines exist directly adjacent.
              </li>
              <li>First click is always guaranteed 100% safe!</li>
              <li>
                Score Formula: 1,000 &minus; (Seconds &times; 10) (Minimum 100
                points upon winning).
              </li>
            </ul>
          </div>
        )}

        {/* Difficulty Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6 p-2 rounded-2xl border border-border/80 bg-card/60 backdrop-blur">
          <span className="text-xs font-bold text-muted-foreground ml-2">
            Grid Size:
          </span>
          <div className="flex gap-1.5">
            {(["beginner", "intermediate", "expert"] as const).map((lvl) => {
              const isActive = difficulty === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setDifficulty(lvl)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs capitalize tracking-wide transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-sm shadow-rose-500/25 scale-100"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scoreboard Cards */}
        <div className="grid grid-cols-3 gap-3 my-3 sm:my-4 max-w-screen-sm mx-auto">
          {/* Mines Counter */}
          <div className="p-3 sm:p-4 rounded-2xl border border-border/80 bg-card/80 backdrop-blur shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
              <Bomb className="h-5 w-5 fill-rose-500/30" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Mines
              </p>
              <p className="text-xl sm:text-2xl font-black font-mono tracking-tight text-rose-600 dark:text-rose-400">
                {String(remainingMines).padStart(2, "0")}
              </p>
            </div>
          </div>

          {/* Best Score */}
          <div className="p-3 sm:p-4 rounded-2xl border border-border/80 bg-card/80 backdrop-blur shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Trophy className="h-5 w-5 fill-amber-500/30" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Best
              </p>
              <p className="text-xl sm:text-2xl font-black font-mono tracking-tight text-amber-600 dark:text-amber-400">
                {getHighScore()}
              </p>
            </div>
          </div>

          {/* Timer */}
          <div className="p-3 sm:p-4 rounded-2xl border border-border/80 bg-card/80 backdrop-blur shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
              <Timer className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Time
              </p>
              <p className="text-xl sm:text-2xl font-black font-mono tracking-tight text-sky-600 dark:text-sky-400">
                {String(timer).padStart(3, "0")}s
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Action Mode & Scale Toggle */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 my-3 sm:my-4">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground font-semibold">
              Mode:
            </span>
            <div className="inline-flex p-1 rounded-xl bg-secondary border border-border/70 text-xs font-bold">
              <button
                onClick={() => setMobileMode("dig")}
                className={`px-3 py-1 rounded-lg flex items-center gap-1 transition-all ${
                  mobileMode === "dig"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                <Shovel className="h-3.5 w-3.5" />
                <span>Dig</span>
              </button>
              <button
                onClick={() => setMobileMode("flag")}
                className={`px-3 py-1 rounded-lg flex items-center gap-1 transition-all ${
                  mobileMode === "flag"
                    ? "bg-rose-500 text-white shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                <Flag className="h-3.5 w-3.5 fill-current" />
                <span>Flag</span>
              </button>
            </div>
          </div>

          {(difficulty === "intermediate" || difficulty === "expert") && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground font-semibold">
                Zoom:
              </span>
              <div className="inline-flex p-1 rounded-xl bg-secondary border border-border/70 text-xs font-bold">
                <button
                  onClick={() => setCellScale("fit")}
                  className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
                    cellScale === "fit"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                  title="Fit to Screen"
                >
                  <span>Fit</span>
                </button>
                <button
                  onClick={() => setCellScale("normal")}
                  className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
                    cellScale === "normal"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                  title="Large Touch Target"
                >
                  <span>Zoom</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Minefield Grid Container */}
        <div className="flex justify-center mb-4 w-full">
          <div className="w-full max-w-full p-2 sm:p-4 rounded-2xl sm:rounded-3xl border-2 border-border/80 bg-card/70 backdrop-blur-xl shadow-lg overflow-auto max-h-[65vh] sm:max-h-none overscroll-contain">
            <div className="inline-flex min-w-full justify-center">
              <div
                className="inline-grid shrink-0 gap-0.5 rounded-xl overflow-hidden bg-border/40 p-1"
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
                      difficulty={difficulty}
                      cellScale={cellScale}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      onRightClick={(e) =>
                        handleCellRightClick(e, rowIndex, colIndex)
                      }
                    />
                  )),
                )}
              </div>
            </div>
          </div>
        </div>

        {(difficulty === "intermediate" || difficulty === "expert") && (
          <div className="flex sm:hidden items-center justify-center gap-1.5 text-[11px] text-muted-foreground mb-6">
            <Move className="h-3 w-3 text-rose-500 shrink-0" />
            <span>Geser grid untuk melihat seluruh kotak</span>
          </div>
        )}

        {/* Game Finished Modal / Card */}
        {(isWon || isGameOver) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <UICard
              className={`w-full max-w-md border-2 ${isWon ? "border-emerald-500/40 shadow-glow-emerald" : "border-rose-500/40 shadow-glow-rose"} bg-card rounded-3xl overflow-hidden animate-pop-in`}
            >
              <div
                className={`h-3 ${isWon ? "bg-gradient-to-r from-emerald-500 to-teal-400" : "bg-gradient-to-r from-rose-500 to-red-600"}`}
              />
              <CardHeader className="text-center pt-6 pb-2">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl mb-3 animate-bounce-subtle">
                  {isWon ? "🏆" : "💥"}
                </div>
                <CardTitle className="text-2xl md:text-3xl font-black">
                  {isWon ? "Minefield Cleared!" : "Detonation Triggered!"}
                </CardTitle>
                <p className="text-muted-foreground text-sm mt-1">
                  {isWon
                    ? `Brilliant work! You safely uncovered every mine in ${timer} seconds.`
                    : "You stepped on a mine! Reset and try again."}
                </p>
              </CardHeader>

              <CardContent className="space-y-4 pt-2">
                <div className="p-3 rounded-2xl bg-secondary/80 border border-border/80 flex items-center justify-around text-center">
                  <div>
                    <span className="text-xs text-muted-foreground font-semibold">
                      Time Elapsed
                    </span>
                    <p className="text-xl font-black font-mono">{timer}s</p>
                  </div>
                  <div className="h-8 w-px bg-border/80" />
                  <div>
                    <span className="text-xs text-muted-foreground font-semibold">
                      Difficulty
                    </span>
                    <p className="text-xl font-black capitalize">
                      {difficulty}
                    </p>
                  </div>
                  {isWon && (
                    <>
                      <div className="h-8 w-px bg-border/80" />
                      <div>
                        <span className="text-xs text-muted-foreground font-semibold">
                          Score
                        </span>
                        <p className="text-xl font-black font-mono text-emerald-500">
                          {Math.max(1000 - timer * 10, 100)}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <Button
                    onClick={resetGame}
                    className="flex-1 rounded-xl font-bold py-2.5 gap-2"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>Try Again</span>
                  </Button>
                  <Link to="/" className="sm:w-auto">
                    <Button
                      variant="outline"
                      className="w-full rounded-xl gap-2"
                    >
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </UICard>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
