import { useState, useEffect, useCallback } from "react";

interface Pipe {
  x: number;
  topHeight: number;
  bottomHeight: number;
  passed: boolean;
}

const GAME_HEIGHT = 600;
const GAME_WIDTH = 400;
const BIRD_SIZE = 40;
const PIPE_WIDTH = 64;
const PIPE_GAP = 150;
const GRAVITY = 0.6;
const JUMP_STRENGTH = -10;
const PIPE_SPEED = 3;

export function useFlappyBird() {
  const [birdY, setBirdY] = useState(GAME_HEIGHT / 2);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const jump = useCallback(() => {
    if (!isGameStarted) {
      setIsGameStarted(true);
      return;
    }
    if (isGameOver) return;
    setBirdVelocity(JUMP_STRENGTH);
  }, [isGameStarted, isGameOver]);

  const resetGame = () => {
    setBirdY(GAME_HEIGHT / 2);
    setBirdVelocity(0);
    setPipes([]);
    setScore(0);
    setIsGameStarted(false);
    setIsGameOver(false);
  };

  // Game loop
  useEffect(() => {
    if (!isGameStarted || isGameOver) return;

    const gameLoop = setInterval(() => {
      // Update bird position
      setBirdVelocity((v) => v + GRAVITY);
      setBirdY((y) => {
        const newY = y + birdVelocity;

        // Check ground and ceiling collision
        if (newY <= 0 || newY >= GAME_HEIGHT - BIRD_SIZE) {
          setIsGameOver(true);
          return y;
        }

        return newY;
      });

      // Update pipes
      setPipes((currentPipes) => {
        let newPipes = currentPipes.map((pipe) => ({
          ...pipe,
          x: pipe.x - PIPE_SPEED,
        }));

        // Add new pipe
        if (
          newPipes.length === 0 ||
          newPipes[newPipes.length - 1].x < GAME_WIDTH - 250
        ) {
          const topHeight = Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 50;
          newPipes.push({
            x: GAME_WIDTH,
            topHeight,
            bottomHeight: GAME_HEIGHT - topHeight - PIPE_GAP,
            passed: false,
          });
        }

        // Remove off-screen pipes and update score
        newPipes = newPipes.filter((pipe) => {
          if (pipe.x < -PIPE_WIDTH) return false;

          // Check if bird passed pipe
          if (!pipe.passed && pipe.x < 80 - PIPE_WIDTH / 2) {
            pipe.passed = true;
            setScore((s) => s + 1);
          }

          return true;
        });

        // Check collision with pipes
        newPipes.forEach((pipe) => {
          const birdLeft = 80 - BIRD_SIZE / 2;
          const birdRight = 80 + BIRD_SIZE / 2;
          const birdTop = birdY;
          const birdBottom = birdY + BIRD_SIZE;

          const pipeLeft = pipe.x;
          const pipeRight = pipe.x + PIPE_WIDTH;

          if (birdRight > pipeLeft && birdLeft < pipeRight) {
            if (
              birdTop < pipe.topHeight ||
              birdBottom > GAME_HEIGHT - pipe.bottomHeight
            ) {
              setIsGameOver(true);
            }
          }
        });

        return newPipes;
      });
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [isGameStarted, isGameOver, birdVelocity, birdY]);

  // Handle click/tap
  useEffect(() => {
    const handleInteraction = () => jump();

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [jump]);

  // Handle spacebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump]);

  return {
    birdY,
    pipes,
    score,
    isGameStarted,
    isGameOver,
    gameHeight: GAME_HEIGHT,
    gameWidth: GAME_WIDTH,
    resetGame,
    jump,
  };
}
