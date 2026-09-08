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
import { Trophy } from "lucide-react";

interface GameCardProps {
  game: GameInfo;
  highScore?: number;
}

export default function GameCard({ game, highScore }: GameCardProps) {
  const difficultyColors = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-red-500",
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="text-4xl mb-2">{game.icon}</div>
          <Badge
            className={`${difficultyColors[game.difficulty]} text-white border-0`}
          >
            {game.difficulty}
          </Badge>
        </div>
        <CardTitle>{game.name}</CardTitle>
        <CardDescription>{game.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {highScore !== undefined && highScore > 0 && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
            <span>High Score: {highScore}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-auto">
        <Link to={game.path} className="w-full">
          <Button className="w-full">Play Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
