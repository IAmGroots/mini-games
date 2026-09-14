import { cn } from "@/lib/utils";

interface TileProps {
  value: number;
}

const TILE_STYLES: Record<number, string> = {
  2: "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 text-foreground border border-border/80 font-bold",
  4: "bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/60 dark:to-orange-900/60 text-amber-900 dark:text-amber-100 border border-amber-300/40 font-bold",
  8: "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-amber-500/30 font-bold",
  16: "bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/30 font-bold",
  32: "bg-gradient-to-br from-orange-600 to-rose-500 text-white shadow-md shadow-rose-500/30 font-extrabold",
  64: "bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-md shadow-rose-500/40 font-extrabold",
  128: "bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 text-white shadow-glow-amber font-extrabold ring-1 ring-white/40",
  256: "bg-gradient-to-br from-yellow-300 via-amber-500 to-orange-500 text-white shadow-glow-amber font-black ring-2 ring-yellow-300/60",
  512: "bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 text-white shadow-glow-emerald font-black ring-2 ring-emerald-300/60",
  1024: "bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 text-white shadow-glow-cyan font-black ring-2 ring-cyan-300/60",
  2048: "bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-amber-400 text-white shadow-glow font-black ring-4 ring-amber-400/80 animate-pulse",
  4096: "bg-gradient-to-tr from-purple-700 via-indigo-600 to-cyan-400 text-white shadow-glow font-black ring-4 ring-cyan-400/80 animate-pulse",
};

export default function Tile({ value }: TileProps) {
  if (value === 0) return null;

  const fontClass =
    value < 100
      ? "text-2xl sm:text-3xl md:text-4xl"
      : value < 1000
        ? "text-xl sm:text-2xl md:text-3xl"
        : "text-base sm:text-lg md:text-xl";

  const styleClass =
    TILE_STYLES[value] || "bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black";

  return (
    <div
      className={cn(
        "absolute inset-0 rounded-2xl flex items-center justify-center font-mono select-none transition-all duration-150 animate-pop-in shadow-sm",
        fontClass,
        styleClass,
      )}
    >
      {value}
    </div>
  );
}
