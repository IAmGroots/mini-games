interface BirdProps {
  y: number;
}

export default function Bird({ y }: BirdProps) {
  // Dynamic tilt angle: tilts up when ascending, dips down when falling
  const rotation = Math.max(-25, Math.min((y - 250) / 6, 65));

  return (
    <div
      className="absolute left-20 w-10 h-10 rounded-full select-none pointer-events-none transition-transform duration-75 z-20"
      style={{
        top: `${y}px`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Bird Body with Vibrant Gradient & Glow */}
      <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-yellow-200 border-2 border-amber-600/80 shadow-md">
        {/* Flapping Wing */}
        <div className="absolute top-3 left-1.5 w-4 h-3 bg-white/70 rounded-full border border-amber-600/40 shadow-sm" />

        {/* Big Expressive Eye */}
        <div className="absolute top-1.5 right-2 w-3.5 h-3.5 bg-white rounded-full border border-black/20 flex items-center justify-center">
          <div className="w-2 h-2 bg-slate-950 rounded-full relative">
            {/* Pupil Glint */}
            <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-white rounded-full" />
          </div>
        </div>

        {/* Cute Beak */}
        <div className="absolute top-4 -right-2 w-3.5 h-2.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-r-md border border-orange-700/80 shadow-sm" />

        {/* Rosy Cheek */}
        <div className="absolute bottom-2 right-3 w-2 h-1.5 bg-rose-400/60 rounded-full blur-[0.5px]" />
      </div>
    </div>
  );
}
