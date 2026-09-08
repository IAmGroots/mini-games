import { useLocalStorage } from "./useLocalStorage";
import { GameScore } from "@/types";

export function useGameScore(gameId: string) {
  const [scores, setScores] = useLocalStorage<GameScore[]>(
    `highScores-${gameId}`,
    [],
  );

  const addScore = (score: number, metadata?: GameScore["metadata"]) => {
    const newScore: GameScore = {
      gameId,
      score,
      timestamp: Date.now(),
      metadata,
    };

    setScores((prevScores) => {
      const updatedScores = [...prevScores, newScore];
      return updatedScores.sort((a, b) => b.score - a.score).slice(0, 10);
    });
  };

  const getHighScore = () => {
    return scores.length > 0 ? scores[0].score : 0;
  };

  const clearScores = () => {
    setScores([]);
  };

  return { scores, addScore, getHighScore, clearScores };
}
