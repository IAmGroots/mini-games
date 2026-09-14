import { cn } from "@/lib/utils";
import { HelpCircle, Check } from "lucide-react";

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
  const showFront = isFlipped || isMatched;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isMatched || isFlipped}
      className={cn(
        "aspect-square w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl font-bold transition-all duration-300 transform select-none relative overflow-hidden",
        "border-2 flex items-center justify-center shadow-sm",
        // Front face (Flipped or Matched)
        showFront && !isMatched &&
          "bg-gradient-to-br from-violet-500/25 via-purple-500/15 to-card border-violet-500/70 shadow-glow-sm scale-100 cursor-default",
        showFront && isMatched &&
          "bg-gradient-to-br from-emerald-500/25 via-teal-500/15 to-card border-emerald-500/70 shadow-glow-emerald scale-100 cursor-default",
        // Back face (Hidden, ready to be clicked)
        !showFront &&
          "bg-gradient-to-br from-card via-secondary/80 to-card border-border/80 hover:border-fuchsia-500/50 hover:bg-secondary hover:scale-105 active:scale-95 cursor-pointer",
      )}
      aria-label={showFront ? `Card ${emoji}` : "Hidden card"}
    >
      {showFront ? (
        <span className="text-3xl sm:text-4xl md:text-5xl animate-pop-in drop-shadow-sm">
          {emoji}
        </span>
      ) : (
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      )}

      {isMatched && (
        <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center animate-pop-in shadow-sm">
          <Check className="w-2.5 h-2.5 stroke-[3]" />
        </div>
      )}
    </button>
  );
}
