export default function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: 320 }}
    >
      <p
        className="font-display uppercase"
        style={{
          fontSize: 32,
          color: "rgba(26,26,26,0.18)",
          letterSpacing: "0.02em",
          lineHeight: 1,
        }}
      >
        No products found
      </p>
      <p
        className="mt-3 font-serif italic"
        style={{ fontSize: 14, color: "rgba(26,26,26,0.4)" }}
      >
        Try adjusting your filters
      </p>
    </div>
  );
}
