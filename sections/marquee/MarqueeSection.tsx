"use client";

const ITEMS = [
  "LEGEND VAPE STORE VAPOR",
  "FIND YOUR FLAVOR",
  "ZERO COMPROMISE",
  "PREMIUM HARDWARE",
  "LAB CERTIFIED",
  "9 SIGNATURE FLAVORS",
];

/**
 * Gold ticker. Track is duplicated so a -50% translate gives a seamless loop.
 * Hover pauses. Burgundy stars between items + a thin black border above
 * and below so it reads as a layered ribbon.
 */
export default function MarqueeSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      data-section="marquee"
    >
      {/* Top + bottom hairlines for ribbon feel */}
      <div className="h-px w-full bg-bg-dark/35" />

      <div
        className="relative w-full overflow-hidden"
        style={{
          height: 76,
          background:
            "linear-gradient(180deg, #D6BB7E 0%, #C8A96E 50%, #B89D5E 100%)",
        }}
      >
        <div className="legend-vape-store-marquee absolute inset-y-0 flex items-center whitespace-nowrap will-change-transform">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-12 pr-12">
              {ITEMS.map((label, i) => (
                <span key={`${dup}-${i}`} className="flex items-center gap-12">
                  <span
                    className="display-tight text-bg-dark"
                    style={{ fontSize: 36, letterSpacing: "0.05em" }}
                  >
                    {label}
                  </span>
                  <span
                    aria-hidden
                    style={{ color: "#8B1A1A", fontSize: 26, lineHeight: 1 }}
                  >
                    ✦
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24"
          style={{ background: "linear-gradient(to right, rgba(200,169,110,0.95), transparent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24"
          style={{ background: "linear-gradient(to left, rgba(200,169,110,0.95), transparent)" }}
        />
      </div>

      <div className="h-px w-full bg-bg-dark/35" />
    </section>
  );
}
