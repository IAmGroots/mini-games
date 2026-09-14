import { cn } from "@/lib/utils";
import { X, Circle } from "lucide-react";

interface SquareProps {
  value: "X" | "O" | null;
  onClick: () => void;
  isWinning?: boolean;
  disabled?: boolean;
}

export default function Square({
  value,
  onClick,
  isWinning,
  disabled,
}: SquareProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={cn(
        "aspect-square rounded-2xl md:rounded-3xl flex items-center justify-center transition-all duration-200 select-none relative overflow-hidden",
        "border-2",
        // Empty state
        !value &&
          "bg-card/70 border-border/70 hover:border-cyan-500/50 hover:bg-accent/60 hover:scale-[1.03] active:scale-95 cursor-pointer shadow-sm",
        // Winning state
        isWinning &&
          "bg-emerald-500/20 border-emerald-500 shadow-glow-emerald animate-pulse scale-[1.02]",
        // X state
        value === "X" &&
          !isWinning &&
          "bg-cyan-500/10 border-cyan-500/40 text-cyan-500 shadow-glow-cyan/50",
        // O state
        value === "O" &&
          !isWinning &&
          "bg-rose-500/10 border-rose-500/40 text-rose-500 shadow-glow-rose/50",
        // Disabled state
        (disabled || value !== null) && "cursor-default",
      )}
      aria-label={value ? `Square with ${value}` : "Empty square"}
    >
      {value === "X" && (
        <X className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 stroke-[2.5] text-cyan-500 dark:text-cyan-400 animate-pop-in drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
      )}
      {value === "O" && (
        <Circle className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 stroke-[2.5] text-rose-500 dark:text-rose-400 animate-pop-in drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]" />
      )}
    </button>
  );
}
