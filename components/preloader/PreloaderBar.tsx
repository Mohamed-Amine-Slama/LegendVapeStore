interface PreloaderBarProps {
  progress: number;
}

export default function PreloaderBar({ progress }: PreloaderBarProps) {
  return (
    <div
      className="relative mt-9 h-[2px] w-[220px] overflow-hidden"
      style={{ background: "rgba(26,26,26,0.18)" }}
    >
      <div
        className="absolute inset-y-0 left-0 bg-bg-dark"
        style={{
          width: `${progress}%`,
          transition: "width 0.05s linear",
        }}
      />
      {/* Shimmer */}
      <div
        aria-hidden
        className="legend-vape-store-shimmer absolute inset-0"
        style={{ mixBlendMode: "overlay" }}
      />
    </div>
  );
}
