interface BirdProps {
  y: number;
}

export default function Bird({ y }: BirdProps) {
  return (
    <div
      className="absolute left-20 w-10 h-10 bg-yellow-400 rounded-full border-2 border-yellow-600 transition-transform"
      style={{
        top: `${y}px`,
        transform: `rotate(${Math.min((y - 200) / 10, 45)}deg)`,
      }}
    >
      {/* Eye */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full" />
      {/* Beak */}
      <div className="absolute top-4 right-0 w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-orange-500 border-b-4 border-b-transparent" />
    </div>
  );
}
