import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GameCard from "@/components/layout/GameCard";
import { GameInfo } from "@/types";
import { useGameScore } from "@/hooks/useGameScore";

const games: GameInfo[] = [
  {
    id: "memory-card",
    name: "Memory Card",
    description: "Match pairs of cards to test your memory",
    icon: "🃏",
    path: "/game/memory-card",
    difficulty: "Easy",
  },
  {
    id: "game-2048",
    name: "2048",
    description: "Slide tiles to reach 2048",
    icon: "🔢",
    path: "/game/2048",
    difficulty: "Hard",
  },
  {
    id: "flappy-bird",
    name: "Flappy Bird",
    description: "Fly through pipes without crashing",
    icon: "🐦",
    path: "/game/flappy-bird",
    difficulty: "Hard",
  },
  {
    id: "tic-tac-toe",
    name: "Tic Tac Toe",
    description: "Classic X and O game against AI",
    icon: "⭕",
    path: "/game/tic-tac-toe",
    difficulty: "Easy",
  },
  {
    id: "typing",
    name: "Typing Game",
    description: "Test your typing speed and accuracy",
    icon: "⌨️",
    path: "/game/typing",
    difficulty: "Medium",
  },
  {
    id: "minesweeper",
    name: "Minesweeper",
    description: "Find all mines without triggering them",
    icon: "💣",
    path: "/game/minesweeper",
    difficulty: "Medium",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Mini Games Collection
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose from 6 classic games to play. Challenge yourself and beat
            your high scores!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => {
            const { getHighScore } = useGameScore(game.id);
            return (
              <GameCard key={game.id} game={game} highScore={getHighScore()} />
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
