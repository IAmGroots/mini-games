import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Bird from "./Bird";
import Pipe from "./Pipe";
import { useFlappyBird } from "./useFlappyBird";
import { useGameScore } from "@/hooks/useGameScore";
import { useEffect } from "react";

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
  } = useFlappyBird();
  const { addScore, getHighScore } = useGameScore("flappy-bird");

  useEffect(() => {
      if (isGameOver) {
        addScore(score);
      }
    }, [isGameOver]);

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
            <h1 className="text-3xl font-bold">Flappy Bird</h1>
            <Button variant="outline" onClick={resetGame}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
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

          {/* Game Container */}
          <div className="flex justify-center mb-8">
            <div
              className="relative overflow-hidden rounded-xl border-4 border-slate-700 bg-gradient-to-b from-sky-300 to-sky-400"
              style={{ width: `${gameWidth}px`, height: `${gameHeight}px` }}
            >
              {/* Ground */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-green-700 to-green-800" />

              {/* Bird */}
              <Bird y={birdY} />

              {/* Pipes */}
              {pipes.map((pipe, index) => (
                <div key={index}>
                  <Pipe x={pipe.x} height={pipe.topHeight} isTop={true} />
                  <Pipe x={pipe.x} height={pipe.bottomHeight} isTop={false} />
                </div>
              ))}

              {/* Start Message */}
              {!isGameStarted && !isGameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Card className="max-w-xs">
                    <CardContent className="p-6 text-center">
                      <p className="text-xl font-bold mb-4">Ready to Fly?</p>
                      <p className="text-muted-foreground">
                        Click, tap, or press spacebar to start
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Game Over */}
              {isGameOver && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Card className="max-w-xs">
                    <CardHeader>
                      <CardTitle className="text-2xl text-center">
                        💀 Game Over!
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <div>
                        <p className="text-muted-foreground mb-2">
                          Your Score:
                        </p>
                        <Badge className="text-2xl px-6 py-2">{score}</Badge>
                      </div>
                      {score === getHighScore() && score > 0 && (
                        <p className="text-sm text-yellow-500 font-semibold">
                          🏆 New High Score!
                        </p>
                      )}
                      <Button onClick={resetGame} className="w-full">
                        Play Again
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <Card className="mt-8 w-fit mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">How to Play</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Click, tap, or press spacebar to make the bird fly</li>
                <li>Avoid hitting the pipes or the ground</li>
                <li>Each pipe you pass gives you 1 point</li>
                <li>Try to beat your high score!</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
