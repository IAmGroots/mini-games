import { useState, useEffect } from "react";

const TEXTS = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "Practice makes perfect when learning to type faster.",
  ],
  medium: [
    "In the digital age, typing speed and accuracy are essential skills for productivity and communication.",
    "The art of programming requires not only logical thinking but also efficient typing to bring ideas to life.",
    "Mastering keyboard shortcuts and touch typing can significantly improve your workflow and efficiency.",
  ],
  hard: [
    "Sophisticated algorithms and data structures form the backbone of modern software engineering, enabling developers to create efficient, scalable, and maintainable applications.",
    "The intersection of artificial intelligence, machine learning, and natural language processing has revolutionized how we interact with technology and process information.",
    "Cybersecurity professionals must stay vigilant against increasingly sophisticated threats while implementing robust encryption, authentication, and authorization mechanisms.",
  ],
};

type Difficulty = "easy" | "medium" | "hard";

export function useTypingGame(duration: number = 60) {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    selectRandomText();
  }, [difficulty]);

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isStarted) {
      finishGame();
    }
  }, [isStarted, timeLeft]);

  const selectRandomText = () => {
    const texts = TEXTS[difficulty];
    const randomIndex = Math.floor(Math.random() * texts.length);
    setText(texts[randomIndex]);
  };

  const startGame = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    setUserInput("");
    setTimeLeft(duration);
  };

  const finishGame = () => {
    setIsStarted(false);
    setIsFinished(true);
  };

  const handleInput = (input: string) => {
    // Auto-start game when user starts typing
    if (!isStarted && input.length > 0 && !isFinished) {
      setIsStarted(true);
      setStartTime(Date.now());
      setTimeLeft(duration);
    }

    setUserInput(input);

    // Check if user completed the text
    if (input.length >= text.length && isStarted) {
      finishGame();
    }
  };

  const resetGame = () => {
    setUserInput("");
    setIsStarted(false);
    setIsFinished(false);
    setTimeLeft(duration);
    setStartTime(null);
    selectRandomText();
  };

  const calculateWPM = (): number => {
    if (!startTime || userInput.length === 0) return 0;

    const timeElapsed = isFinished
      ? (duration - timeLeft) / 60
      : (Date.now() - startTime) / 60000;

    const wordsTyped = userInput.length / 5; // Standard: 5 characters = 1 word
    return Math.round(wordsTyped / Math.max(timeElapsed, 0.01));
  };

  const calculateAccuracy = (): number => {
    if (userInput.length === 0) return 100;

    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) {
        correctChars++;
      }
    }

    return Math.round((correctChars / userInput.length) * 100);
  };

  return {
    text,
    userInput,
    isStarted,
    isFinished,
    timeLeft,
    wpm: calculateWPM(),
    accuracy: calculateAccuracy(),
    difficulty,
    handleInput,
    startGame,
    resetGame,
    setDifficulty,
  };
}
