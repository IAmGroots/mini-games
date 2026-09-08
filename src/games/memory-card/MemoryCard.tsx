import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
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

  useEffect(() => {
    if (isComplete) {
      // Calculate score (higher is better, based on fewer moves and less time)
      const score = Math.max(1000 - moves * 10 - elapsedTime, 0);
      addScore(score, { moves, time: elapsedTime });

      // Confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isComplete]);

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
            <h1 className="text-3xl font-bold">Memory Card Game</h1>
            <Button variant="outline" onClick={resetGame}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <UICard>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Moves</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{moves}</div>
              </CardContent>
            </UICard>
            <UICard>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{matches} / 8</div>
              </CardContent>
            </UICard>
            <UICard>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{elapsedTime}s</div>
              </CardContent>
            </UICard>
            <UICard>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                  High Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getHighScore()}</div>
              </CardContent>
            </UICard>
          </div>

          {/* Game Board */}
          <div className="grid grid-cols-4 gap-4 mb-8 w-fit mx-auto">
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

          {/* Win Message */}
          {isComplete && (
            <div className="text-center">
              <UICard className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    🎉 Congratulations!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    You completed the game in {moves} moves and {elapsedTime}{" "}
                    seconds!
                  </p>
                  <Badge className="text-lg px-4 py-2">
                    Score: {Math.max(1000 - moves * 10 - elapsedTime, 0)}
                  </Badge>
                </CardContent>
              </UICard>
            </div>
          )}

          {/* Info */}
          <UICard className="mt-8 w-fit mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">How to Play</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  Click on cards to flip them and reveal the emoji
                </li>
                <li>
                  Find matching pairs by remembering the location of emojis
                </li>
                <li>You can only flip 2 cards at a time</li>
                <li>
                  If the cards match, they stay flipped. If not, they flip back
                  after 1 second
                </li>
                <li>
                  The goal is to match all 8 pairs with the fewest moves and
                  fastest time
                </li>
                <li>
                  Score = 1000 - (Moves × 10) - Time in seconds (minimum 0)
                </li>
              </ul>
            </CardContent>
          </UICard>
        </div>
      </main>
      <Footer />
    </div>
  );
}
