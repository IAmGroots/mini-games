interface PipeProps {
  x: number;
  height: number;
  isTop: boolean;
}

export default function Pipe({ x, height, isTop }: PipeProps) {
  return (
    <div
      className="absolute w-16 bg-green-600 border-4 border-green-700"
      style={{
        left: `${x}px`,
        height: `${height}px`,
        [isTop ? "top" : "bottom"]: 0,
      }}
    >
      {/* Pipe cap */}
      <div
        className={`absolute left-0 right-0 h-8 bg-green-600 border-4 border-green-700 ${
          isTop ? "bottom-[-8px]" : "top-[-8px]"
        }`}
        style={{ width: "72px", marginLeft: "-4px" }}
      />
    </div>
  );
}
