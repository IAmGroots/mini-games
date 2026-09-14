import Square from "./Square";

interface BoardProps {
  squares: ("X" | "O" | null)[];
  onClick: (index: number) => void;
  winningLine: number[] | null;
  disabled?: boolean;
}

export default function Board({
  squares,
  onClick,
  winningLine,
  disabled,
}: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-[340px] sm:max-w-md mx-auto p-4 sm:p-6 rounded-3xl border border-border/80 bg-gradient-to-b from-card/80 to-secondary/30 backdrop-blur-xl shadow-lg relative overflow-hidden">
      {/* Decorative ambient corner glows */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onClick(index)}
          isWinning={winningLine?.includes(index)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
