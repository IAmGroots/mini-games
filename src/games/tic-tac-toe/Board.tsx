import Square from "./Square";

interface BoardProps {
  squares: ("X" | "O" | null)[];
  onClick: (index: number) => void;
  winningLine: number[] | null;
}

export default function Board({ squares, onClick, winningLine }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onClick(index)}
          isWinning={winningLine?.includes(index)}
        />
      ))}
    </div>
  );
}
