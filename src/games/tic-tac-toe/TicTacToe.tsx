import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Board from "./Board";
import { useTicTacToe } from "./useTicTacToe";

export default function TicTacToe() {
  const {
    squares,
    isXNext,
    winner,
    winningLine,
    isDraw,
    xScore,
    oScore,
    draws,
    handleClick,
    resetGame,
    resetScores,
  } = useTicTacToe();

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner === "X" ? "You (X)" : "AI (O)"}`;
    } else if (isDraw) {
      return "It's a Draw!";
    } else {
      return `Current Turn: ${isXNext ? "You (X)" : "AI (O)"}`;
    }
  };

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
            <h1 className="text-3xl font-bold">Tic Tac Toe</h1>
            <Button variant="outline" onClick={resetGame}>
              <RotateCcw className="mr-2 h-4 w-4" />
              New Game
            </Button>
          </div>

          {/* Status */}
          <div className="text-center mb-8">
            <Badge
              variant={
                winner === "X"
                  ? "default"
                  : winner === "O"
                    ? "destructive"
                    : "secondary"
              }
              className="text-lg px-6 py-2"
            >
              {getStatus()}
            </Badge>
          </div>

          {/* Scoreboard */}
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-blue-500">
                  You (X)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{xScore}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Draws</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{draws}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-red-500">
                  AI (O)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{oScore}</div>
              </CardContent>
            </Card>
          </div>

          {/* Game Board */}
          <Board
            squares={squares}
            onClick={handleClick}
            winningLine={winningLine}
          />

          {/* Reset Scores */}
          <div className="text-center mt-8">
            <Button variant="outline" onClick={resetScores}>
              Reset Scores
            </Button>
          </div>

          {/* Info */}
          <Card className="mt-8 w-fit mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">How to Play</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>You play as X, the AI plays as O</li>
                <li>Click on any empty square to make your move</li>
                <li>
                  Get three in a row (horizontally, vertically, or diagonally)
                  to win
                </li>
                <li>The AI uses minimax algorithm - it's unbeatable!</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
