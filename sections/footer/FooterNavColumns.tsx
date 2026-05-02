"use client";

import { FOOTER_COLUMNS } from "@/constants/navigation";

export default function FooterNavColumns() {
  return (
    <div
      className="grid w-full grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4"
      style={{ columnGap: "clamp(40px, 5vw, 80px)" }}
    >
      {FOOTER_COLUMNS.map((col) => (
        <div key={col.header} className="flex flex-col gap-4">
          <h4
            className="font-ui font-semibold uppercase"
            style={{
              fontSize: 11,
              letterSpacing: "0.32em",
              color: "rgba(200,169,110,0.78)",
            }}
          >
            {col.header}
          </h4>
          <ul className="flex flex-col gap-2.5">
            {col.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group relative inline-flex items-center font-ui text-[14px] transition-colors duration-200 hover:text-accent"
                  style={{ color: "rgba(240,237,232,0.78)" }}
                >
                  <span>{link.label}</span>
                  <span
                    aria-hidden
                    className="ml-1.5 inline-block translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
