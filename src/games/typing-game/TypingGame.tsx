import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  RotateCcw,
  Timer,
  Zap,
  Target,
  Trophy,
  HelpCircle,
  Play,
  Home,
  Sparkles,
  Keyboard,
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
import WordDisplay from "./WordDisplay";
import { useTypingGame } from "./useTypingGame";
import { useGameScore } from "@/hooks/useGameScore";

export default function TypingGame() {
  const {
    text,
    userInput,
    isStarted,
    isFinished,
    timeLeft,
    wpm,
    accuracy,
    difficulty,
    handleInput,
    resetGame,
    setDifficulty,
  } = useTypingGame();

  const { addScore, getHighScore } = useGameScore("typing");
  const [showRules, setShowRules] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea when resetting
  const handleReset = () => {
    resetGame();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  // When game completes, save score and fire celebration confetti
  useEffect(() => {
    if (isFinished && wpm > 0) {
      addScore(wpm, { accuracy, time: 60 - timeLeft });
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#10b981", "#14b8a6", "#3b82f6", "#f59e0b"],
      });
    }
  }, [isFinished]);

  const progressPercent = text.length > 0
    ? Math.min(Math.round((userInput.length / text.length) * 100), 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-emerald-500/20">
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20">
              <Keyboard className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">Typing Test</h1>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hidden sm:block">
                Speed & Accuracy Challenge
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
              onClick={handleReset}
              className="gap-2 rounded-xl font-bold hover:border-emerald-500/50"
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
              <li>Type each character exactly as shown in the preview display.</li>
              <li>Timer begins automatically when you type your first letter.</li>
              <li>WPM is calculated as: <code>(Characters &divide; 5) &divide; Minutes</code>.</li>
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
                  onClick={() => setDifficulty(lvl)}
                  disabled={isStarted && !isFinished}
                  className={`px-4 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-sm shadow-emerald-500/25 scale-100"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  } ${isStarted && !isFinished ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Arcade HUD Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {/* Time Left */}
          <div className="p-4 rounded-2xl border border-border/70 bg-card/80 backdrop-blur shadow-sm flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                timeLeft <= 10
                  ? "bg-rose-500/15 text-rose-500 animate-pulse"
                  : "bg-sky-500/10 text-sky-500"
              }`}
            >
              <Timer className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Time Left</p>
              <p
                className={`text-xl md:text-2xl font-black font-mono tracking-tight ${
                  timeLeft <= 10 ? "text-rose-500" : ""
                }`}
              >
                {timeLeft}s
              </p>
            </div>
          </div>

          {/* Current WPM */}
          <div className="p-4 rounded-2xl border border-border/70 bg-card/80 backdrop-blur shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">WPM</p>
              <p className="text-xl md:text-2xl font-black font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
                {wpm}
              </p>
            </div>
          </div>

          {/* Accuracy */}
          <div className="p-4 rounded-2xl border border-border/70 bg-card/80 backdrop-blur shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center shrink-0">
              <Target className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Accuracy</p>
                <span className="text-xs font-mono font-bold">{accuracy}%</span>
              </div>
              <div className="w-full bg-secondary h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-violet-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${accuracy}%` }}
                />
              </div>
            </div>
          </div>

          {/* High Score (Best WPM) */}
          <div className="p-4 rounded-2xl border border-border/70 bg-card/80 backdrop-blur shadow-sm flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Trophy className="h-5 w-5 fill-amber-500/30" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Best WPM</p>
              <p className="text-xl md:text-2xl font-black font-mono tracking-tight text-amber-600 dark:text-amber-400">
                {getHighScore()}
              </p>
            </div>
          </div>
        </div>

        {/* Text Passage Display */}
        <div className="mb-4">
          <WordDisplay text={text} userInput={userInput} />
        </div>

        {/* Completion Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1.5 px-1">
            <span>Passage Progress</span>
            <span className="font-mono">{progressPercent}%</span>
          </div>
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-150 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* User Input Area or Result Screen */}
        {isFinished ? (
          /* Finished Result Modal / Card */
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <UICard className="w-full max-w-md border-2 border-emerald-500/40 bg-card shadow-glow-emerald rounded-3xl overflow-hidden animate-pop-in">
              <div className="h-3 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />
              <CardHeader className="text-center pt-6 pb-2">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/30 mb-3 animate-bounce-subtle">
                  ⌨️
                </div>
                <CardTitle className="text-2xl md:text-3xl font-black">Speed Test Complete!</CardTitle>
                <p className="text-muted-foreground text-sm mt-1">
                  {wpm >= 60
                    ? "Lightning fast! You're a typing prodigy!"
                    : wpm >= 40
                      ? "Great speed and rhythm! Keep practicing!"
                      : "Solid work! Consistency is key!"}
                </p>
              </CardHeader>

              <CardContent className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">Speed</p>
                    <p className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">{wpm}</p>
                    <p className="text-[11px] text-muted-foreground font-semibold">Words Per Min</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20">
                    <p className="text-xs text-violet-600 dark:text-violet-400 font-bold uppercase tracking-wider">Accuracy</p>
                    <p className="text-3xl font-black font-mono text-violet-600 dark:text-violet-400 mt-1">{accuracy}%</p>
                    <p className="text-[11px] text-muted-foreground font-semibold">Precision</p>
                  </div>
                </div>

                {wpm >= getHighScore() && wpm > 0 && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-center font-bold text-xs flex items-center justify-center gap-1.5">
                    <Sparkles className="h-4 w-4" />
                    <span>New Personal Best Record!</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <Button
                    onClick={handleReset}
                    className="flex-1 rounded-xl font-bold py-2.5 gap-2"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>Try Again</span>
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
        ) : (
          <div className="relative">
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={(e) => handleInput(e.target.value)}
              className="w-full h-32 p-4 text-lg font-mono rounded-2xl border-2 border-border/80 bg-card/80 backdrop-blur focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 resize-none transition-all outline-none shadow-sm placeholder:text-muted-foreground/50"
              placeholder="Click here and start typing to automatically begin the timer..."
              autoFocus
            />
            {!isStarted && (
              <p className="text-xs text-muted-foreground text-center mt-2 flex items-center justify-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                <span>Timer activates on your first typed character</span>
              </p>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
