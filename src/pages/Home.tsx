import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GameCard from "@/components/layout/GameCard";
import { GameInfo } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Gamepad2,
  Dices,
  Flame,
  ShieldCheck,
  Zap,
} from "lucide-react";

const games: GameInfo[] = [
  {
    id: "memory-card",
    name: "Memory Card",
    description: "Flip cards, memorize icons, and match all 8 pairs in record time.",
    icon: "🃏",
    path: "/game/memory-card",
    difficulty: "Easy",
  },
  {
    id: "tic-tac-toe",
    name: "Tic Tac Toe",
    description: "Battle our Minimax AI in the ultimate unbeatable test of wits.",
    icon: "⭕",
    path: "/game/tic-tac-toe",
    difficulty: "Easy",
  },
  {
    id: "typing",
    name: "Typing Test",
    description: "Push your words-per-minute (WPM) and accuracy in a 60s sprint.",
    icon: "⌨️",
    path: "/game/typing",
    difficulty: "Medium",
  },
  {
    id: "minesweeper",
    name: "Minesweeper",
    description: "Clear the minefield using logic, deduction, and tactical flagging.",
    icon: "💣",
    path: "/game/minesweeper",
    difficulty: "Medium",
  },
  {
    id: "game-2048",
    name: "2048",
    description: "Slide and merge matching number tiles to reach the glorious 2048.",
    icon: "🔢",
    path: "/game/2048",
    difficulty: "Hard",
  },
  {
    id: "flappy-bird",
    name: "Flappy Bird",
    description: "Dodge incoming obstacles with precise rhythmic taps and flap physics.",
    icon: "🐦",
    path: "/game/flappy-bird",
    difficulty: "Hard",
  },
];

export default function Home() {
  const [filter, setFilter] = useState<"All" | "Easy" | "Medium" | "Hard">("All");
  const navigate = useNavigate();

  const filteredGames =
    filter === "All" ? games : games.filter((g) => g.difficulty === filter);

  const handleRandomPlay = () => {
    const randomIndex = Math.floor(Math.random() * games.length);
    navigate(games[randomIndex].path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Header />

      <main className="flex-1 container px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="relative text-center mb-12 md:mb-16 overflow-hidden rounded-3xl p-6 md:p-12 border border-border/80 bg-gradient-to-b from-primary/5 via-accent/20 to-card/50 backdrop-blur-xl shadow-sm">
          {/* Subtle decorative glow spots */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-wider mb-6 animate-pulse-glow">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Arcade Playground Collection</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-5 leading-tight">
              Play, Compete &{" "}
              <span className="text-gradient">Beat Your Best!</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
              Dive into 6 finely crafted mini-games. Train your memory, test your typing speed, outsmart AI, and dominate the leaderboards.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <Button
                size="lg"
                onClick={handleRandomPlay}
                className="gap-2 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/45 text-base px-6 py-3"
              >
                <Dices className="h-5 w-5 animate-spin-slow" />
                <span>Random Game Pick</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const gridEl = document.getElementById("game-library");
                  gridEl?.scrollIntoView({ behavior: "smooth" });
                }}
                className="gap-2 text-base px-6 py-3"
              >
                <Gamepad2 className="h-5 w-5 text-primary" />
                <span>Browse Games</span>
              </Button>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 mt-10 pt-8 border-t border-border/60 text-xs font-semibold text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>Instant Play &bull; No Login</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Local High Scores Saved</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-rose-500" />
                <span>Smooth 60 FPS Physics</span>
              </div>
            </div>
          </div>
        </section>

        {/* Game Library Header & Filters */}
        <section id="game-library" className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
                <Gamepad2 className="h-7 w-7 text-primary" />
                <span>Game Library</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Choose a title below to start playing right in your browser.
              </p>
            </div>

            {/* Difficulty Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-secondary/80 backdrop-blur rounded-2xl border border-border/80 text-xs">
              {(["All", "Easy", "Medium", "Hard"] as const).map((level) => {
                const isActive = filter === level;
                return (
                  <button
                    key={level}
                    onClick={() => setFilter(level)}
                    className={`px-3.5 py-1.5 rounded-xl font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-card text-foreground shadow-sm shadow-black/10 scale-100"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/40"
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Game Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
