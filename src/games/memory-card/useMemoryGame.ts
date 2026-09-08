import { useState, useEffect } from "react";

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function useMemoryGame(gridSize: number = 16) {
  const emojis = ["🎮", "🎯", "🎨", "🎭", "🎪", "🎵", "🎸", "🎺"];
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  // Timer
  useEffect(() => {
    if (startTime && !isComplete) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime, isComplete]);

  const initializeGame = () => {
    const pairsCount = gridSize / 2;
    const selectedEmojis = emojis.slice(0, pairsCount);
    const duplicatedEmojis = [...selectedEmojis, ...selectedEmojis];

    // Fisher-Yates shuffle
    const shuffled = duplicatedEmojis
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsComplete(false);
    setStartTime(null);
    setElapsedTime(0);
  };

  const flipCard = (cardId: number) => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    const targetCard = cards.find(card => card.id === cardId);

    if (
      flippedCards.length === 2 ||
      flippedCards.includes(cardId) ||
      targetCard?.isMatched
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card,
      );

      if (newFlippedCards.length === 2) {
        setMoves((prev) => prev + 1);
        checkMatch(newFlippedCards, updatedCards);
      }

      return updatedCards;
    });
  };

  const checkMatch = (flippedIds: number[], currentCards: Card[]) => {
    const [firstId, secondId] = flippedIds;
    const firstCard = currentCards.find((card) => card.id === firstId)!;
    const secondCard = currentCards.find((card) => card.id === secondId)!;
    console.log(`CheckMatch called with IDs: [${firstId}, ${secondId}]`);
    console.log(`Checking match: ${firstCard.emoji} vs ${secondCard.emoji}`);

    if (firstCard.emoji === secondCard.emoji) {
      // Match found - keep cards flipped and mark as matched
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, isMatched: true, isFlipped: true }
            : card,
        ),
      );
      setMatches((prev) => {
        const newMatches = prev + 1;
        if (newMatches === gridSize / 2) {
          setIsComplete(true);
        }
        return newMatches;
      });
      setFlippedCards([]);
    } else {
      // No match - flip back after delay
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card,
          ),
        );
        setFlippedCards([]);
      }, 1000);
    }
  };

  const resetGame = () => {
    initializeGame();
  };

  return {
    cards,
    moves,
    matches,
    isComplete,
    elapsedTime,
    flipCard,
    resetGame,
  };
}
