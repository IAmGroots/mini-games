import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WordDisplay from "./WordDisplay";
import { useTypingGame } from "./useTypingGame";

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

  // Call when game finishes
  if (isFinished && !isStarted && userInput.length > 0) {
    setTimeout(() => {}, 100);
  }

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
            <h1 className="text-3xl font-bold">Typing Speed Test</h1>
            <Button variant="outline" onClick={resetGame}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          {/* Difficulty Selection */}
          <div className="mb-8 text-center">
            <p className="text-muted-foreground mb-4">Select Difficulty:</p>
            <div className="flex gap-4 justify-center">
              {(["easy", "medium", "hard"] as const).map((level) => (
                <Button
                  key={level}
                  variant={difficulty === level ? "default" : "outline"}
                  onClick={() => setDifficulty(level)}
                  disabled={isStarted || isFinished}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Time Left</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{timeLeft}s</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">WPM</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{wpm}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{accuracy}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Text Display */}
          <div className="mb-8">
            <WordDisplay text={text} userInput={userInput} />
          </div>

          {/* Input or Finish Screen */}
          {isFinished ? (
            <div className="text-center">
              <Card className="max-w-md mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl">⌨️ Test Complete!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-muted-foreground mb-2">Your Results:</p>
                    <Badge className="text-lg px-4 py-2 mr-2">WPM: {wpm}</Badge>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      Accuracy: {accuracy}%
                    </Badge>
                  </div>
                  <Button onClick={resetGame} className="w-full">
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div>
              <textarea
                value={userInput}
                onChange={(e) => handleInput(e.target.value)}
                className="w-full h-32 p-4 text-lg font-mono rounded-lg border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Start typing here to begin..."
                autoFocus
              />
              {!isStarted && (
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Your timer will start when you begin typing
                </p>
              )}
            </div>
          )}

          {/* Info */}
          <Card className="mt-8 w-fit mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">How to Play</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Choose your difficulty level (Easy, Medium, or Hard)</li>
                <li>Start typing to begin the test automatically</li>
                <li>Type the text as accurately and quickly as possible</li>
                <li>You have 60 seconds to complete the test</li>
                <li>
                  Your WPM (Words Per Minute) and accuracy will be calculated
                </li>
                <li>
                  Green characters are correct, red characters are mistakes
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
