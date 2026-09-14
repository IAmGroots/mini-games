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
  difficulty?: "beginner" | "intermediate" | "expert";
  cellScale?: "fit" | "normal";
}

const NUMBER_COLORS: Record<number, string> = {
  1: "text-blue-500 font-extrabold",
  2: "text-emerald-500 font-extrabold",
  3: "text-rose-500 font-extrabold",
  4: "text-violet-600 dark:text-violet-400 font-extrabold",
  5: "text-amber-600 dark:text-amber-400 font-extrabold",
  6: "text-cyan-600 dark:text-cyan-400 font-extrabold",
  7: "text-fuchsia-600 dark:text-fuchsia-400 font-extrabold",
  8: "text-slate-600 dark:text-slate-300 font-extrabold",
};

export default function Cell({
  value,
  isRevealed,
  isFlagged,
  isMine,
  isGameOver,
  onClick,
  onRightClick,
  difficulty = "beginner",
  cellScale = "fit",
}: CellProps) {
  const handleClick = () => {
    if (!isRevealed && !isFlagged) {
      onClick();
    }
  };

  // Responsive cell sizes tailored to grid density and mobile viewports
  const getSizing = () => {
    const isFit = cellScale === "fit";

    if (difficulty === "expert") {
      return isFit
        ? {
            box: "w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-md",
            text: "text-[9px] sm:text-[11px] md:text-xs",
            icon: "h-2.5 w-2.5 sm:h-3 sm:w-3",
          }
        : {
            box: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-md",
            text: "text-[11px] sm:text-xs md:text-sm",
            icon: "h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4",
          };
    }

    if (difficulty === "intermediate") {
      return isFit
        ? {
            box: "w-[21px] h-[21px] sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-md",
            text: "text-[11px] sm:text-xs md:text-sm",
            icon: "h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4",
          }
        : {
            box: "w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-md",
            text: "text-xs sm:text-sm",
            icon: "h-3.5 w-3.5 sm:h-4 sm:w-4",
          };
    }

    return {
      box: "w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-md",
      text: "text-xs sm:text-sm md:text-base",
      icon: "h-3.5 w-3.5 sm:h-4 sm:w-4",
    };
  };

  const { box, text, icon } = getSizing();

  return (
    <button
      onClick={handleClick}
      onContextMenu={onRightClick}
      className={cn(
        box,
        "flex items-center justify-center font-mono font-bold select-none transition-all duration-100",
        "border border-border/80",
        // Unrevealed state (tactile 3D appearance)
        !isRevealed &&
          "bg-gradient-to-br from-card via-secondary/90 to-card hover:brightness-110 active:scale-95 cursor-pointer shadow-sm",
        // Revealed non-mine
        isRevealed &&
          !isMine &&
          "bg-secondary/40 border-border/30 cursor-default",
        // Exploded / GameOver Mine
        isGameOver &&
          isMine &&
          "bg-rose-500/20 border-rose-500/50 text-rose-500",
        isGameOver &&
          isMine &&
          isRevealed &&
          "bg-rose-500 text-white animate-pulse",
      )}
      aria-label={
        isRevealed
          ? isMine
            ? "Mine"
            : `Cell with ${value} neighbor mines`
          : isFlagged
            ? "Flagged cell"
            : "Hidden cell"
      }
    >
      {isFlagged && !isRevealed ? (
        <Flag
          className={cn(
            icon,
            "text-rose-500 fill-rose-500 animate-pop-in drop-shadow-[0_0_6px_rgba(244,63,94,0.5)]",
          )}
        />
      ) : isRevealed ? (
        isMine ? (
          <Bomb className={cn(icon, "animate-pop-in")} />
        ) : value > 0 ? (
          <span className={cn(NUMBER_COLORS[value], text)}>{value}</span>
        ) : null
      ) : null}
    </button>
  );
}
