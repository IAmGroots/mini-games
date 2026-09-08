import { cn } from "@/lib/utils";

interface SquareProps {
  value: "X" | "O" | null;
  onClick: () => void;
  isWinning?: boolean;
}

export default function Square({ value, onClick, isWinning }: SquareProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "aspect-square rounded-lg text-5xl font-bold transition-all duration-200",
        "border-2 flex items-center justify-center hover:scale-105",
        "bg-secondary hover:bg-secondary/80 border-border",
        isWinning && "bg-green-500/20 border-green-500",
        value === "X" && "text-blue-500",
        value === "O" && "text-red-500",
      )}
    >
      {value}
    </button>
  );
}
