import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameInfo } from "@/types";
import { Trophy, ArrowRight, Sparkles } from "lucide-react";
import { useGameScore } from "@/hooks/useGameScore";

interface GameCardProps {
  game: GameInfo;
  highScore?: number;
}

const GAME_THEMES: Record<
  string,
  {
    bgGradient: string;
    iconBg: string;
    borderHover: string;
    shadowHover: string;
    badgeVariant: "success" | "warning" | "destructive";
    accentColor: string;
  }
> = {
  "memory-card": {
    bgGradient: "from-fuchsia-500/10 via-purple-500/5 to-transparent",
    iconBg: "from-fuchsia-500 to-purple-600 text-white shadow-fuchsia-500/25",
    borderHover: "hover:border-fuchsia-500/50",
    shadowHover: "hover:shadow-glow",
    badgeVariant: "success",
    accentColor: "text-fuchsia-500",
  },
  "tic-tac-toe": {
    bgGradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
    iconBg: "from-cyan-500 to-blue-600 text-white shadow-cyan-500/25",
    borderHover: "hover:border-cyan-500/50",
    shadowHover: "hover:shadow-glow-cyan",
    badgeVariant: "success",
    accentColor: "text-cyan-500",
  },
  typing: {
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    iconBg: "from-emerald-500 to-teal-600 text-white shadow-emerald-500/25",
    borderHover: "hover:border-emerald-500/50",
    shadowHover: "hover:shadow-glow-emerald",
    badgeVariant: "warning",
    accentColor: "text-emerald-500",
  },
  minesweeper: {
    bgGradient: "from-rose-500/10 via-orange-500/5 to-transparent",
    iconBg: "from-rose-500 to-red-600 text-white shadow-rose-500/25",
    borderHover: "hover:border-rose-500/50",
    shadowHover: "hover:shadow-glow-rose",
    badgeVariant: "warning",
    accentColor: "text-rose-500",
  },
  "game-2048": {
    bgGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    iconBg: "from-amber-500 to-orange-600 text-white shadow-amber-500/25",
    borderHover: "hover:border-amber-500/50",
    shadowHover: "hover:shadow-glow-amber",
    badgeVariant: "destructive",
    accentColor: "text-amber-500",
  },
  "flappy-bird": {
    bgGradient: "from-sky-500/10 via-blue-500/5 to-transparent",
    iconBg: "from-sky-500 to-blue-600 text-white shadow-sky-500/25",
    borderHover: "hover:border-sky-500/50",
    shadowHover: "hover:shadow-glow-cyan",
    badgeVariant: "destructive",
    accentColor: "text-sky-500",
  },
};

export default function GameCard({ game, highScore: propHighScore }: GameCardProps) {
  const { getHighScore } = useGameScore(game.id);
  const currentHighScore = propHighScore !== undefined ? propHighScore : getHighScore();

  const theme = GAME_THEMES[game.id] || {
    bgGradient: "from-violet-500/10 to-transparent",
    iconBg: "from-violet-500 to-indigo-600 text-white shadow-violet-500/25",
    borderHover: "hover:border-primary/50",
    shadowHover: "hover:shadow-glow",
    badgeVariant: "success" as const,
    accentColor: "text-primary",
  };

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${theme.borderHover} ${theme.shadowHover} bg-card/90 backdrop-blur-xl border-border/70`}
    >
      {/* Subtle top gradient accent */}
      <div
        className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${theme.bgGradient} pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-60`}
      />

      <CardHeader className="relative z-10 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr ${theme.iconBg} text-2xl shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
          >
            <span>{game.icon}</span>
          </div>

          <Badge variant={theme.badgeVariant} className="font-bold text-xs uppercase">
            {game.difficulty}
          </Badge>
        </div>

        <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center gap-1.5">
          {game.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {game.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative z-10 pb-4">
        {currentHighScore > 0 ? (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs">
            <Trophy className="h-4 w-4 text-amber-500 fill-amber-500 shrink-0 animate-bounce-subtle" />
            <span>High Score:</span>
            <span className="ml-auto font-mono text-sm">{currentHighScore.toLocaleString()}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted/40 text-muted-foreground text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            <span>No score yet - Be the first!</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="relative z-10 mt-auto pt-0">
        <Link to={game.path} className="w-full">
          <Button
            className="w-full rounded-xl font-bold transition-all duration-200 group-hover:shadow-md flex items-center justify-center gap-2"
          >
            <span>Play Now</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
