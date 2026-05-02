"use client";

export default function ShopFooterCTA() {
  return (
    <section
      className="relative flex w-full items-center justify-between overflow-hidden bg-bg-dark"
      style={{
        height: 160,
        marginTop: 80,
        padding: "0 80px",
      }}
      data-section="shop-footer-cta"
    >
      {/* Subtle noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-[2] flex flex-col gap-1.5">
        <h3
          className="font-display uppercase text-white"
          style={{ fontSize: 42, lineHeight: 1, letterSpacing: "0.005em" }}
        >
          Can&apos;t decide?
        </h3>
        <p
          className="font-serif italic"
          style={{ fontSize: 16, color: "rgba(255,255,255,0.5)" }}
        >
          Take the flavor quiz
        </p>
      </div>

      <a
        href="#quiz"
        className="relative z-[2] inline-flex items-center gap-2 rounded-full transition-all duration-220"
        style={{
          background: "#C8A96E",
          color: "#1A1A1A",
          padding: "13px 30px",
          fontSize: 12,
          letterSpacing: "0.1em",
          fontWeight: 600,
          fontFamily: "var(--font-ui)",
          textTransform: "uppercase",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.04)";
          e.currentTarget.style.boxShadow = "0 10px 28px rgba(200,169,110,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        Take the quiz
        <span aria-hidden>→</span>
      </a>
    </section>
  );
}
