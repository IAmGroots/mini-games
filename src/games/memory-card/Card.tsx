import { cn } from "@/lib/utils";

interface CardProps {
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export default function Card({
  emoji,
  isFlipped,
  isMatched,
  onClick,
}: CardProps) {
  return (
    <button
      onClick={onClick}
      disabled={isMatched || isFlipped}
      className={cn(
        "aspect-square w-32 h-32 rounded-lg text-4xl font-bold transition-all duration-300 transform hover:scale-105",
        "border-2 flex items-center justify-center",
        isFlipped || isMatched
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-secondary hover:bg-secondary/80 border-border",
        isMatched && "cursor-not-allowed",
        !isFlipped && !isMatched && "cursor-pointer",
      )}
    >
      {isFlipped || isMatched ? emoji : "?"}
    </button>
  );
}
