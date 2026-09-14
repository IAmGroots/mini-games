import { useState, TouchEvent } from "react";
import Tile from "./Tile";

interface GridProps {
  grid: number[][];
  onSwipe?: (direction: "up" | "down" | "left" | "right") => void;
}

export default function Grid({ grid, onSwipe }: GridProps) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    if (!onSwipe) return;
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStart || !onSwipe) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const minSwipeDistance = 30;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        onSwipe(deltaX > 0 ? "right" : "left");
      }
    } else {
      if (Math.abs(deltaY) > minSwipeDistance) {
        onSwipe(deltaY > 0 ? "down" : "up");
      }
    }
    setTouchStart(null);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative p-3 sm:p-4 rounded-3xl border-2 border-border/80 bg-gradient-to-b from-card/90 via-card/60 to-secondary/40 backdrop-blur-xl shadow-xl select-none"
    >
      {/* 4x4 Tiles Grid */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4">
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-secondary/50 border border-border/50 shadow-inner flex items-center justify-center overflow-hidden"
            >
              {value > 0 && (
                <Tile key={`${rowIndex}-${colIndex}-${value}`} value={value} />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
