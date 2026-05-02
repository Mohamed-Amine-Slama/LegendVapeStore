"use client";

import { forwardRef } from "react";

const ManifestoGhostText = forwardRef<HTMLDivElement>(function ManifestoGhostText(_, ref) {
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center text-center display-tight"
      style={{
        fontSize: "clamp(110px, 22vw, 320px)",
        color: "rgba(240,237,232,0.05)",
        lineHeight: 0.82,
        whiteSpace: "pre-line",
      }}
      aria-hidden
    >
      {`Legend Vape Store your senses\nwith every pull`}
    </div>
  );
});

export default ManifestoGhostText;
