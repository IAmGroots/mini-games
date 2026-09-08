import Tile from "./Tile";

interface GridProps {
  grid: number[][];
}

export default function Grid({ grid }: GridProps) {
  return (
    <div className="relative bg-slate-300 dark:bg-slate-700 p-4 rounded-xl inline-block">
      {/* Background Grid */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={index}
            className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-slate-200 dark:bg-slate-600"
          />
        ))}
      </div>

      {/* Tiles */}
      <div className="absolute top-4 left-4">
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              value={value}
              position={{ row: rowIndex, col: colIndex }}
            />
          )),
        )}
      </div>
    </div>
  );
}
