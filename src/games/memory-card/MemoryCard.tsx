import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  Timer,
  Footprints,
  Sparkles,
  HelpCircle,
  Play,
  Home,
  Award,
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
import Card from "./Card";
import { useMemoryGame } from "./useMemoryGame";
import { useGameScore } from "@/hooks/useGameScore";

export default function MemoryCard() {
  const {
    cards,
    moves,
    matches,
    isComplete,
    elapsedTime,
    flipCard,
    resetGame,
  } = useMemoryGame(16);
  const { addScore, getHighScore } = useGameScore("memory-card");
  const [showRules, setShowRules] = useState(false);

  const currentScore = Math.max(1000 - moves * 10 - elapsedTime, 0);

  useEffect(() => {
    if (isComplete) {
      addScore(currentScore, { moves, time: elapsedTime });

      // Vibrant Confetti Cannon
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#7c3aed", "#ec4899", "#10b981", "#f59e0b", "#3b82f6"],
      });
    }
  }, [isComplete]);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-fuchsia-500/20">
      <Header />

      <main className="flex-1 container px-4 py-6 md:py-10 max-w-4xl mx-auto">
        {/* Game Navigation Header */}
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-fuchsia-500 to-purple-600 text-white shadow-md shadow-fuchsia-500/20">
              <span className="text-base">🃏</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">Memory Card</h1>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden sm:block">
                Match all 8 pairs
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
              className="gap-2 rounded-xl font-bold hover:border-fuchsia-500/50"
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
              <li>Click two cards to reveal matching emoji pairs.</li>
              <li>Mismatched cards will flip back automatically after 1 second.</li>
              <li>Formula: Score = 1,000 - (Moves &times; 10) - Elapsed Seconds.</li>
            </ul>
          </div>
        )}

        {/* Arcade HUD Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {/* Moves */}
          <div className="p-4 rounded-2xl border border-border/70 bg-card/80 backdrop-blur shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center shrink-0">
              <Footprints className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Moves</p>
              <p className="text-xl md:text-2xl font-black font-mono tracking-tight">{moves}</p>
            </div>
          </div>

          {/* Matches */}
          <div className="p-4 rounded-2xl border border-border/70 bg-card/80 backdrop-blur shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Matched</p>
                <span className="text-xs font-mono font-bold text-emerald-500">{matches}/8</span>
              </div>
              <div className="w-full bg-secondary h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(matches / 8) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Time */}
          <div className="p-4 rounded-2xl border border-border/70 bg-card/80 backdrop-blur shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
              <Timer className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Time</p>
              <p className="text-xl md:text-2xl font-black font-mono tracking-tight">{elapsedTime}s</p>
            </div>
          </div>

          {/* Best Score */}
          <div className="p-4 rounded-2xl border border-border/70 bg-card/80 backdrop-blur shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Trophy className="h-5 w-5 fill-amber-500/30" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Best Score</p>
              <p className="text-xl md:text-2xl font-black font-mono tracking-tight text-amber-600 dark:text-amber-400">
                {getHighScore().toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Game Board Container */}
        <div className="p-4 sm:p-6 md:p-8 rounded-3xl border border-border/80 bg-gradient-to-b from-card/90 via-card/50 to-secondary/30 backdrop-blur-xl shadow-lg flex justify-center items-center relative overflow-hidden">
          {/* Subtle glow circle */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4 relative z-10">
            {cards.map((card) => (
              <Card
                key={card.id}
                emoji={card.emoji}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={() => flipCard(card.id)}
              />
            ))}
          </div>
        </div>

        {/* Victory Modal Overlay */}
        {isComplete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <UICard className="w-full max-w-md border-2 border-emerald-500/40 bg-card shadow-glow-emerald rounded-3xl overflow-hidden animate-pop-in">
              <div className="h-3 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />
              <CardHeader className="text-center pt-6 pb-2">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/30 mb-3 animate-bounce-subtle">
                  🎉
                </div>
                <CardTitle className="text-2xl md:text-3xl font-black">Memory Master!</CardTitle>
                <p className="text-muted-foreground text-sm mt-1">
                  You conquered the grid and matched all 8 pairs!
                </p>
              </CardHeader>

              <CardContent className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-secondary/80 border border-border/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-500" />
                    <span className="font-bold text-sm">Final Score</span>
                  </div>
                  <Badge variant="success" className="text-base px-3 py-1 font-mono font-bold">
                    {currentScore} PTS
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
                    <p className="text-xs text-muted-foreground font-semibold">Total Moves</p>
                    <p className="text-lg font-black font-mono mt-0.5">{moves}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
                    <p className="text-xs text-muted-foreground font-semibold">Time Taken</p>
                    <p className="text-lg font-black font-mono mt-0.5">{elapsedTime}s</p>
                  </div>
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
