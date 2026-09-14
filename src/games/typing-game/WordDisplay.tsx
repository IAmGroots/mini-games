import { cn } from "@/lib/utils";

interface WordDisplayProps {
  text: string;
  userInput: string;
}

export default function WordDisplay({ text, userInput }: WordDisplayProps) {
  return (
    <div className="relative p-5 sm:p-7 md:p-8 rounded-3xl border border-border/80 bg-card/90 backdrop-blur-xl shadow-inner text-lg sm:text-xl md:text-2xl font-mono leading-relaxed select-none tracking-normal min-h-[160px] sm:min-h-[180px] overflow-hidden">
      {/* Decorative top dot indicators */}
      <div className="flex items-center gap-1.5 mb-4 opacity-50">
        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
      </div>

      <div className="break-words">
        {text.split("").map((char, index) => {
          let charColor = "text-muted-foreground/50";
          let isCurrent = index === userInput.length;

          if (index < userInput.length) {
            if (userInput[index] === char) {
              charColor = "text-emerald-500 dark:text-emerald-400 font-semibold";
            } else {
              charColor = "text-rose-500 bg-rose-500/20 rounded px-0.5 underline";
            }
          }

          return (
            <span
              key={index}
              className={cn(
                "transition-colors duration-75 relative",
                charColor,
                isCurrent &&
                  "bg-primary/25 text-foreground rounded px-0.5 ring-2 ring-primary/40 font-bold",
              )}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
