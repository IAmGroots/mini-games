import { cn } from "@/lib/utils";

interface TileProps {
  value: number;
  position: { row: number; col: number };
}

const TILE_COLORS: Record<number, string> = {
  2: "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100",
  4: "bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-slate-100",
  8: "bg-orange-400 text-white",
  16: "bg-orange-500 text-white",
  32: "bg-orange-600 text-white",
  64: "bg-red-500 text-white",
  128: "bg-yellow-400 text-white",
  256: "bg-yellow-500 text-white",
  512: "bg-yellow-600 text-white",
  1024: "bg-green-500 text-white text-3xl",
  2048: "bg-green-600 text-white text-3xl",
  4096: "bg-purple-500 text-white text-3xl",
};

export default function Tile({ value, position }: TileProps) {
  if (value === 0) return null;

  // w-20 = 80px, md:w-24 = 96px, gap-4 = 32px
  const tileSize = 80; // Base size (w-20)
  const gap = 32; // gap-4

  return (
    <div
      className={cn(
        "absolute w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center font-bold text-4xl transition-all duration-150",
        TILE_COLORS[value] || "bg-purple-600 text-white",
        "animate-in fade-in zoom-in",
      )}
      style={{
        top: `${position.row * (tileSize + gap)}px`,
        left: `${position.col * (tileSize + gap)}px`,
      }}
    >
      {value}
    </div>
  );
}
