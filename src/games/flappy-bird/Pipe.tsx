interface PipeProps {
  x: number;
  height: number;
  isTop: boolean;
}

export default function Pipe({ x, height, isTop }: PipeProps) {
  return (
    <div
      className="absolute w-16 select-none pointer-events-none z-10 border-x-2 border-emerald-950/70"
      style={{
        left: `${x}px`,
        height: `${height}px`,
        [isTop ? "top" : "bottom"]: 0,
        background:
          "linear-gradient(90deg, #059669 0%, #10b981 30%, #34d399 50%, #059669 100%)",
      }}
    >
      {/* Pipe cap / collar */}
      <div
        className={`absolute left-0 right-0 h-7 rounded-sm border-2 border-emerald-950/80 shadow-md ${
          isTop ? "bottom-0" : "top-0"
        }`}
        style={{
          width: "72px",
          marginLeft: "-4px",
          background:
            "linear-gradient(90deg, #047857 0%, #10b981 30%, #6ee7b7 50%, #047857 100%)",
        }}
      />
    </div>
  );
}
