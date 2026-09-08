import { cn } from "@/lib/utils";
import { Flag, Bomb } from "lucide-react";

interface CellProps {
  value: number;
  isRevealed: boolean;
  isFlagged: boolean;
  isMine: boolean;
  isGameOver: boolean;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}

const NUMBER_COLORS: Record<number, string> = {
  1: "text-blue-600",
  2: "text-green-600",
  3: "text-red-600",
  4: "text-purple-600",
  5: "text-yellow-600",
  6: "text-cyan-600",
  7: "text-black dark:text-white",
  8: "text-gray-600",
};

export default function Cell({
  value,
  isRevealed,
  isFlagged,
  isMine,
  isGameOver,
  onClick,
  onRightClick,
}: CellProps) {
  const handleClick = () => {
    if (!isRevealed && !isFlagged) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      onContextMenu={onRightClick}
      className={cn(
        "w-8 h-8 md:w-10 md:h-10 border flex items-center justify-center font-bold text-sm md:text-base transition-all",
        isRevealed
          ? "bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
          : "bg-slate-300 dark:bg-slate-600 border-slate-400 dark:border-slate-500 hover:bg-slate-400 dark:hover:bg-slate-500 active:bg-slate-500",
        isGameOver && isMine && "bg-red-500",
      )}
    >
      {isFlagged && !isRevealed ? (
        <Flag className="h-4 w-4 text-red-500" fill="currentColor" />
      ) : isRevealed ? (
        isMine ? (
          <Bomb className="h-4 w-4" />
        ) : value > 0 ? (
          <span className={NUMBER_COLORS[value]}>{value}</span>
        ) : null
      ) : null}
    </button>
  );
}
