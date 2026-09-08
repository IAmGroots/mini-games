import { Link } from "react-router-dom";
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  ArrowUp,
  ArrowDown,
  ArrowLeftIcon,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Grid from "./Grid";
import { use2048 } from "./use2048";
import { useGameScore } from "@/hooks/useGameScore";
import { useEffect } from "react";

export default function Game2048() {
  const { grid, score, isGameOver, hasWon, move, resetGame } = use2048();
  const { addScore, getHighScore } = useGameScore("game-2048");

  useEffect(() => {
    if (hasWon || isGameOver) {
      addScore(score);
    }
  }, [hasWon || isGameOver]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">2048</h1>
            <Button variant="outline" onClick={resetGame}>
              <RotateCcw className="mr-2 h-4 w-4" />
              New Game
            </Button>
          </div>

          {/* Scores */}
          <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{score}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                  Best
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{getHighScore()}</div>
              </CardContent>
            </Card>
          </div>

          {/* Win/Game Over Messages */}
          {(hasWon || isGameOver) && (
            <div className="text-center mb-8">
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {hasWon && !isGameOver ? "🎉 You Win!" : "💀 Game Over!"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {hasWon && !isGameOver
                      ? "You reached 2048! Keep playing to get a higher score."
                      : "No more moves available!"}
                  </p>
                  <Badge className="text-lg px-4 py-2">
                    Final Score: {score}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Game Grid */}
          <div className="flex justify-center mb-8">
            <Grid grid={grid} />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden">
            <p className="text-center text-sm text-muted-foreground mb-4">
              Use the arrows to move tiles
            </p>
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
              <div />
              <Button
                variant="outline"
                size="lg"
                onClick={() => move("up")}
                className="aspect-square"
              >
                <ArrowUp className="h-6 w-6" />
              </Button>
              <div />
              <Button
                variant="outline"
                size="lg"
                onClick={() => move("left")}
                className="aspect-square"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => move("down")}
                className="aspect-square"
              >
                <ArrowDown className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => move("right")}
                className="aspect-square"
              >
                <ArrowRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Info */}
          <Card className="mt-8 w-fit mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">How to Play</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  Use arrow keys (desktop) or buttons (mobile) to move tiles
                </li>
                <li>
                  When two tiles with the same number touch, they merge into one
                </li>
                <li>The goal is to create a tile with the number 2048</li>
                <li>The game ends when you can't make any more moves</li>
                <li>Try to get the highest score possible!</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
