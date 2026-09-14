import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  ArrowUp,
  ArrowDown,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight,
  Flame,
  HelpCircle,
  Play,
  Home,
  Crown,
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
import { Badge } from "@/components/ui/badge";
import Grid from "./Grid";
import { use2048 } from "./use2048";
import { useGameScore } from "@/hooks/useGameScore";

export default function Game2048() {
  const { grid, score, isGameOver, hasWon, move, resetGame } = use2048();
  const { addScore, getHighScore } = useGameScore("game-2048");
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    if (hasWon || isGameOver) {
      addScore(score);
    }
    if (hasWon) {
      confetti({
        particleCount: 130,
        spread: 85,
        origin: { y: 0.6 },
        colors: ["#f59e0b", "#f97316", "#8b5cf6", "#ec4899"],
      });
    }
  }, [hasWon, isGameOver]);

  const bestScore = Math.max(getHighScore(), score);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-amber-500/20">
      <Header />

      <main className="flex-1 container px-4 py-6 md:py-10 max-w-4xl mx-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20 font-black text-sm">
              2048
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">2048 Classic</h1>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden sm:block">
                Merge & Conquer
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
              className="gap-2 rounded-xl font-bold hover:border-amber-500/50"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">New Game</span>
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
              <li>Use arrow keys, swipe on mobile, or on-screen buttons to slide all tiles.</li>
              <li>When two tiles with identical numbers collide, they merge into one with doubled value!</li>
              <li>Join numbers together to create the legendary <strong>2048</strong> tile!</li>
            </ul>
          </div>
        )}

        {/* Scoreboard Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6 max-w-sm mx-auto">
          {/* Current Score */}
          <div className="p-3 sm:p-4 rounded-2xl border border-border/80 bg-card/80 backdrop-blur shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Score</p>
              <p className="text-xl sm:text-2xl font-black font-mono tracking-tight text-orange-600 dark:text-orange-400">
                {score.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Best Score */}
          <div className="p-3 sm:p-4 rounded-2xl border border-border/80 bg-card/80 backdrop-blur shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Trophy className="h-5 w-5 fill-amber-500/30" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Best</p>
              <p className="text-xl sm:text-2xl font-black font-mono tracking-tight text-amber-600 dark:text-amber-400">
                {bestScore.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* 2048 Game Grid with Swipe Support */}
        <div className="flex justify-center mb-6">
          <Grid grid={grid} onSwipe={move} />
        </div>

        {/* Mobile Control D-pad */}
        <div className="md:hidden max-w-xs mx-auto mb-6">
          <p className="text-center text-xs font-semibold text-muted-foreground mb-3">
            Swipe on grid or tap D-Pad below:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <div />
            <Button
              variant="outline"
              onClick={() => move("up")}
              className="h-12 rounded-xl active:scale-95 shadow-sm"
              aria-label="Move Up"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
            <div />
            <Button
              variant="outline"
              onClick={() => move("left")}
              className="h-12 rounded-xl active:scale-95 shadow-sm"
              aria-label="Move Left"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => move("down")}
              className="h-12 rounded-xl active:scale-95 shadow-sm"
              aria-label="Move Down"
            >
              <ArrowDown className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => move("right")}
              className="h-12 rounded-xl active:scale-95 shadow-sm"
              aria-label="Move Right"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Desktop Controls Hint */}
        <div className="hidden md:flex justify-center items-center gap-4 text-xs font-semibold text-muted-foreground">
          <span>Controls:</span>
          <kbd className="px-2 py-1 rounded-lg bg-secondary border border-border/80 font-mono">↑</kbd>
          <kbd className="px-2 py-1 rounded-lg bg-secondary border border-border/80 font-mono">←</kbd>
          <kbd className="px-2 py-1 rounded-lg bg-secondary border border-border/80 font-mono">↓</kbd>
          <kbd className="px-2 py-1 rounded-lg bg-secondary border border-border/80 font-mono">→</kbd>
          <span>Use keyboard arrows to slide</span>
        </div>

        {/* Victory or Game Over Modal */}
        {(hasWon || isGameOver) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <UICard className="w-full max-w-md border-2 border-amber-500/40 bg-card shadow-glow-amber rounded-3xl overflow-hidden animate-pop-in">
              <div className="h-3 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500" />
              <CardHeader className="text-center pt-6 pb-2">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30 mb-3 animate-bounce-subtle">
                  {hasWon && !isGameOver ? <Crown className="h-8 w-8 text-white" /> : "💀"}
                </div>
                <CardTitle className="text-2xl md:text-3xl font-black">
                  {hasWon && !isGameOver ? "You Reached 2048!" : "Game Over!"}
                </CardTitle>
                <p className="text-muted-foreground text-sm mt-1">
                  {hasWon && !isGameOver
                    ? "Legendary run! You merged your way to 2048!"
                    : "No more valid tile merges remain on the board."}
                </p>
              </CardHeader>

              <CardContent className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-secondary/80 border border-border/80 flex items-center justify-between">
                  <span className="font-bold text-sm text-muted-foreground">Final Score</span>
                  <Badge variant="warning" className="text-lg px-4 py-1.5 font-mono font-black">
                    {score.toLocaleString()}
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <Button
                    onClick={resetGame}
                    className="flex-1 rounded-xl font-bold py-2.5 gap-2"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>Play Again</span>
                  </Button>
                  <Link to="/" className="sm:w-auto">
                    <Button variant="outline" className="w-full rounded-xl gap-2">
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
