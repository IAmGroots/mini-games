import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  HelpCircle,
  Play,
  Home,
  Sparkles,
  Cloud,
  Medal,
  ChevronUp,
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
import Bird from "./Bird";
import Pipe from "./Pipe";
import { useFlappyBird } from "./useFlappyBird";
import { useGameScore } from "@/hooks/useGameScore";

export default function FlappyBird() {
  const {
    birdY,
    pipes,
    score,
    isGameStarted,
    isGameOver,
    gameHeight,
    gameWidth,
    resetGame,
    jump,
  } = useFlappyBird();

  const { addScore, getHighScore } = useGameScore("flappy-bird");
  const [showRules, setShowRules] = useState(false);

  const highScore = getHighScore();
  const isNewHighScore = score > highScore && score > 0;

  useEffect(() => {
    if (isGameOver && score > 0) {
      addScore(score);
      if (isNewHighScore) {
        confetti({
          particleCount: 130,
          spread: 85,
          origin: { y: 0.6 },
          colors: ["#38bdf8", "#fbbf24", "#34d399", "#f43f5e"],
        });
      }
    }
  }, [isGameOver]);

  const bestScore = Math.max(highScore, score);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-sky-500/20">
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-400 to-blue-600 text-white shadow-md shadow-sky-500/20">
              <span className="text-base">🐦</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">Flappy Bird</h1>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden sm:block">
                60 FPS Flap Physics
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
              className="gap-2 rounded-xl font-bold hover:border-sky-500/50"
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
              <li>Click, tap anywhere on the screen, or press <strong>Spacebar</strong> to flap upwards.</li>
              <li>Carefully navigate through green pipes without crashing into the pipes or ground.</li>
              <li>Each pipe obstacle successfully cleared earns 1 point.</li>
            </ul>
          </div>
        )}

        {/* Scoreboard Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6 max-w-sm mx-auto">
          {/* Current Score */}
          <div className="p-3 sm:p-4 rounded-2xl border border-border/80 bg-card/80 backdrop-blur shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Score</p>
              <p className="text-xl sm:text-2xl font-black font-mono tracking-tight text-sky-600 dark:text-sky-400">
                {score}
              </p>
            </div>
          </div>

          {/* Best Score */}
          <div className="p-3 sm:p-4 rounded-2xl border border-border/80 bg-card/80 backdrop-blur shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Trophy className="h-5 w-5 fill-amber-500/30" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Best Score</p>
              <p className="text-xl sm:text-2xl font-black font-mono tracking-tight text-amber-600 dark:text-amber-400">
                {bestScore}
              </p>
            </div>
          </div>
        </div>

        {/* Arcade Cabinet Screen */}
        <div className="flex justify-center mb-6">
          <div
            className="relative overflow-hidden rounded-3xl border-4 border-slate-800 dark:border-slate-700 shadow-2xl bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100 select-none cursor-pointer"
            style={{ width: `${gameWidth}px`, height: `${gameHeight}px`, maxWidth: "100%" }}
            onClick={jump}
          >
            {/* Background Clouds */}
            <div className="absolute top-8 left-12 opacity-40 animate-float pointer-events-none">
              <Cloud className="w-16 h-16 text-white fill-white" />
            </div>
            <div className="absolute top-24 right-10 opacity-30 animate-float pointer-events-none" style={{ animationDelay: "1.5s" }}>
              <Cloud className="w-12 h-12 text-white fill-white" />
            </div>

            {/* In-Game Live Score Floating Overlay */}
            {isGameStarted && !isGameOver && (
              <div className="absolute top-8 inset-x-0 flex justify-center z-30 pointer-events-none">
                <span className="font-black text-5xl text-white font-mono drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
                  {score}
                </span>
              </div>
            )}

            {/* Pipes */}
            {pipes.map((pipe, index) => (
              <div key={index}>
                <Pipe x={pipe.x} height={pipe.topHeight} isTop={true} />
                <Pipe x={pipe.x} height={pipe.bottomHeight} isTop={false} />
              </div>
            ))}

            {/* Bird Entity */}
            <Bird y={birdY} />

            {/* Scrolling Ground / Grass */}
            <div className="absolute bottom-0 left-0 right-0 h-24 z-20 border-t-4 border-emerald-900 bg-gradient-to-b from-amber-600 to-amber-800">
              <div className="h-4 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600" />
            </div>

            {/* Start Screen Overlay */}
            {!isGameStarted && !isGameOver && (
              <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/25 backdrop-blur-[2px]">
                <div className="p-6 rounded-3xl bg-card/95 border border-border/80 text-center shadow-xl max-w-xs animate-pop-in">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 text-white flex items-center justify-center text-2xl shadow-md mb-3 animate-bounce-subtle">
                    🐦
                  </div>
                  <h3 className="font-black text-xl mb-1">Ready to Flap?</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Click, tap anywhere, or hit <kbd className="px-1.5 py-0.5 rounded bg-secondary border text-foreground font-mono">Space</kbd> to launch!
                  </p>
                  <Button size="sm" className="w-full rounded-xl font-bold gap-2">
                    <Play className="h-4 w-4 fill-current" />
                    <span>Tap to Start</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Game Over Screen Overlay */}
            {isGameOver && (
              <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                <UICard className="w-full max-w-xs border-2 border-rose-500/40 bg-card rounded-3xl overflow-hidden shadow-2xl animate-pop-in">
                  <div className="h-2.5 bg-gradient-to-r from-rose-500 to-red-600" />
                  <CardHeader className="text-center pt-5 pb-2">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-2xl mb-2">
                      💀
                    </div>
                    <CardTitle className="text-xl font-black">Game Over!</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3 pt-1 text-center">
                    <div className="p-3 rounded-2xl bg-secondary/80 border border-border/80 flex justify-around items-center">
                      <div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Score</span>
                        <p className="text-2xl font-black font-mono text-sky-600 dark:text-sky-400">{score}</p>
                      </div>
                      <div className="h-8 w-px bg-border/80" />
                      <div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Best</span>
                        <p className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400">{bestScore}</p>
                      </div>
                    </div>

                    {isNewHighScore && (
                      <Badge variant="warning" className="w-full justify-center py-1 gap-1">
                        <Medal className="h-3.5 w-3.5" />
                        <span>New High Score!</span>
                      </Badge>
                    )}

                    <div className="flex gap-2 pt-1">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          resetGame();
                        }}
                        className="flex-1 rounded-xl font-bold py-2 gap-1.5"
                      >
                        <Play className="h-4 w-4 fill-current" />
                        <span>Play Again</span>
                      </Button>
                      <Link to="/" onClick={(e) => e.stopPropagation()}>
                        <Button variant="outline" size="icon" className="rounded-xl">
                          <Home className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </UICard>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Jump Action Button */}
        <div className="flex justify-center sm:hidden mb-4">
          <Button
            size="lg"
            onClick={jump}
            className="w-full max-w-xs h-14 rounded-2xl font-extrabold text-base gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 active:scale-95"
          >
            <ChevronUp className="h-6 w-6 stroke-[3]" />
            <span>FLAP BIRD</span>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
