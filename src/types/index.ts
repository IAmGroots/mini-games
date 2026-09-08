export interface GameScore {
  gameId: string;
  score: number;
  timestamp: number;
  metadata?: {
    moves?: number;
    time?: number;
    accuracy?: number;
  };
}

export interface StorageData {
  theme: "light" | "dark";
  soundEnabled: boolean;
  highScores: {
    memoryCard: GameScore[];
    ticTacToe: GameScore[];
    typing: GameScore[];
    game2048: GameScore[];
    flappyBird: GameScore[];
    minesweeper: GameScore[];
  };
}

export interface GameInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  difficulty: "Easy" | "Medium" | "Hard";
}
