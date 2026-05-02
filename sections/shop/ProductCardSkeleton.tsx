"use client";

/** A loading-state placeholder card with a shimmer animation. */
export default function ProductCardSkeleton() {
  return (
    <div
      className="legend-vape-store-skeleton overflow-hidden"
      style={{
        height: 360,
        borderRadius: 16,
      }}
    >
      <style>{`
        @keyframes legend-vape-store-skeleton-shimmer {
          0%   { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        .legend-vape-store-skeleton {
          background: linear-gradient(
            90deg,
            rgba(26,26,26,0.04) 25%,
            rgba(26,26,26,0.08) 50%,
            rgba(26,26,26,0.04) 75%
          );
          background-size: 400% 100%;
          animation: legend-vape-store-skeleton-shimmer 1.4s ease infinite;
        }
      `}</style>
    </div>
  );
}
