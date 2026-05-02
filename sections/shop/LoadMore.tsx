"use client";

interface LoadMoreProps {
  shown: number;
  total: number;
  onLoadMore: () => void;
}

export default function LoadMore({ shown, total, onLoadMore }: LoadMoreProps) {
  if (shown >= total) return null;
  const pct = Math.min(100, Math.round((shown / Math.max(total, 1)) * 100));

  return (
    <div className="mt-12 flex flex-col items-center">
      <button
        type="button"
        onClick={onLoadMore}
        className="rounded-full border bg-transparent font-ui font-semibold uppercase transition-all duration-250"
        style={{
          fontSize: 12,
          letterSpacing: "0.1em",
          borderWidth: 1.5,
          borderColor: "#1A1A1A",
          color: "#1A1A1A",
          padding: "13px 40px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#1A1A1A";
          e.currentTarget.style.color = "#F0EDE8";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#1A1A1A";
        }}
      >
        Load more
      </button>

      <p
        className="mt-3 font-ui"
        style={{ fontSize: 11, color: "rgba(26,26,26,0.38)" }}
      >
        {shown} of {total} products
      </p>

      <div
        className="mt-2"
        style={{
          width: 160,
          height: 2,
          borderRadius: 1,
          background: "rgba(26,26,26,0.1)",
          overflow: "hidden",
        }}
      >
        <div
          className="transition-[width] duration-400 ease-out"
          style={{
            width: `${pct}%`,
            height: "100%",
            background: "#C8A96E",
          }}
        />
      </div>
    </div>
  );
}
