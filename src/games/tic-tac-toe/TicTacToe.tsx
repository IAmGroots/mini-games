import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  RotateCcw,
  User,
  Bot,
  Equal,
  HelpCircle,
  Play,
  Trash2,
  Loader2,
  Trophy,
} from "lucide-react";
import confetti from "canvas-confetti";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Board from "./Board";
import { useTicTacToe } from "./useTicTacToe";
import { useGameScore } from "@/hooks/useGameScore";

export default function TicTacToe() {
  const {
    squares,
    isXNext,
    winner,
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
  } = useTicTacToe();

  const { addScore, getHighScore, clearScores } = useGameScore("tic-tac-toe");
  const [showRules, setShowRules] = useState(false);

  // Sync high score with user wins
  useEffect(() => {
    if (xScore > getHighScore()) {
      addScore(xScore);
    }
  }, [xScore]);

  // Confetti when user beats AI!
  useEffect(() => {
    if (winner === "X") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#06b6d4", "#3b82f6", "#10b981"],
      });
    }
  }, [winner]);

  const handleResetScores = () => {
    resetScores();
    clearScores();
  };

  const highScore = Math.max(getHighScore(), xScore);

  const isGameOver = Boolean(winner) || isDraw;
  const isAiThinking = !isXNext && !isGameOver;

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-cyan-500/20 overflow-x-hidden">
      <Header />

      <main className="flex-1 container px-4 py-6 md:py-10 max-w-4xl mx-auto">
        {/* Top Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20">
              <span className="text-base">⭕</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">Tic Tac Toe</h1>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden sm:block">
                {difficulty === "easy"
                  ? "Easy AI Match"
                  : difficulty === "medium"
                    ? "Smart AI Match"
                    : "Unbeatable Minimax AI"}
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
              className="gap-2 rounded-xl font-bold hover:border-cyan-500/50"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">New Round</span>
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
              <li>You play as <strong className="text-cyan-500">X</strong> (first move), AI plays as <strong className="text-rose-500">O</strong>.</li>
              <li>Align three in a row horizontally, vertically, or diagonally to win.</li>
              <li>
                AI difficulty can be adjusted: <strong>Easy</strong> makes random blunders, <strong>Medium</strong> defends smartly, and <strong>Hard</strong> uses the unbeatable Minimax algorithm.
              </li>
            </ul>
          </div>
        )}

        {/* Difficulty Selector Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6 p-2 rounded-2xl border border-border/80 bg-card/60 backdrop-blur">
          <span className="text-xs font-bold text-muted-foreground ml-2">Difficulty:</span>
          <div className="flex gap-1.5">
            {(["easy", "medium", "hard"] as const).map((lvl) => {
              const isActive = difficulty === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => {
                    setDifficulty(lvl);
                    resetGame();
                  }}
                  disabled={isAiThinking}
                  className={`px-4 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm shadow-cyan-500/25 scale-100"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  } ${isAiThinking ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scoreboard Cards */}
        {highScore > 0 && (
          <div className="flex items-center justify-center gap-1.5 mb-4 text-xs font-bold text-amber-500">
            <Trophy className="h-4 w-4 fill-amber-500" />
            <span>High Score: {highScore} {highScore === 1 ? "Win" : "Wins"}</span>
          </div>
        )}
        <div className="grid grid-cols-3 gap-3 mb-6 max-w-lg mx-auto">
          {/* Player X */}
          <div className="p-3 sm:p-4 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 backdrop-blur text-center shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 mb-1">
              <User className="h-3.5 w-3.5" />
              <span>You (X)</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black font-mono text-cyan-600 dark:text-cyan-400">
              {xScore}
            </p>
          </div>

          {/* Draws */}
          <div className="p-3 sm:p-4 rounded-2xl border border-border/80 bg-card/80 backdrop-blur text-center shadow-sm">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-muted-foreground mb-1">
              <Equal className="h-3.5 w-3.5" />
              <span>Draws</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black font-mono text-foreground">
              {draws}
            </p>
          </div>

          {/* AI O */}
          <div className="p-3 sm:p-4 rounded-2xl border border-rose-500/30 bg-rose-500/5 backdrop-blur text-center shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 mb-1">
              <Bot className="h-3.5 w-3.5" />
              <span>AI (O)</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black font-mono text-rose-600 dark:text-rose-400">
              {oScore}
            </p>
          </div>
        </div>

        {/* Turn / Status Badge */}
        <div className="flex justify-center mb-6">
          <div
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-bold shadow-sm transition-all duration-300 ${
              winner === "X"
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 shadow-glow-emerald"
                : winner === "O"
                  ? "bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-400 shadow-glow-rose"
                  : isDraw
                    ? "bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400"
                    : isAiThinking
                      ? "bg-secondary border-border text-muted-foreground"
                      : "bg-cyan-500/15 border-cyan-500/40 text-cyan-600 dark:text-cyan-400 shadow-glow-cyan"
            }`}
          >
            {winner === "X" && (
              <>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span>🎉 Victory! You beat the AI!</span>
              </>
            )}
            {winner === "O" && (
              <>
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <span>AI Won! Better luck next round!</span>
              </>
            )}
            {isDraw && (
              <>
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span>Game Tied! Well defended!</span>
              </>
            )}
            {!winner && !isDraw && (
              <>
                {isAiThinking ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                    <span>AI is calculating next move...</span>
                  </>
                ) : (
                  <>
                    <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span>Your Turn &mdash; Place your X</span>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Board Component */}
        <div className="mb-8">
          <Board
            squares={squares}
            onClick={handleClick}
            winningLine={winningLine}
            disabled={isAiThinking || isGameOver}
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {isGameOver && (
            <Button
              onClick={resetGame}
              className="gap-2 rounded-xl font-bold px-6 py-2.5 shadow-md shadow-violet-500/20"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Next Round</span>
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleResetScores}
            className="gap-1.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Reset All Scores</span>
          </Button>
        </div>

        {/* Guide / Info Section */}
        <Card className="mt-12 max-w-lg mx-auto border-border/70 bg-card/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              Did You Know?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            Choose between Easy, Medium, and Hard difficulty. On Hard, the AI uses the unbeatable Minimax decision rule from game theory, anticipating every move to guarantee it never loses!
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
