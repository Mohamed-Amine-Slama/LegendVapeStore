"use client";

const BADGES = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/legend_vape_store_sousse_/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="22" height="22">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M14 3v9.5a3 3 0 1 1-3-3v3a0 0 0 0 0 0 0V13a3 3 0 1 0 3 3V8a6 6 0 0 0 5 2.4V7.5A4.5 4.5 0 0 1 15 3z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M18 3h3l-7.5 8.6L22 21h-6.6l-5-6.4L4.6 21H1.6l8-9.2L1 3h6.7l4.5 6L18 3zm-1.2 16.2h1.7L7.3 4.7H5.5L16.8 19.2z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M21.5 7.2c-.2-1-1-1.8-2-2C18 5 12 5 12 5s-6 0-7.5.2c-1 .2-1.8 1-2 2C2 8.7 2 12 2 12s0 3.3.5 4.8c.2 1 1 1.8 2 2C6 19 12 19 12 19s6 0 7.5-.2c1-.2 1.8-1 2-2 .5-1.5.5-4.8.5-4.8s0-3.3-.5-4.8zM10 15V9l5 3-5 3z"/>
      </svg>
    ),
  },
];

export default function FooterSocialBadges() {
  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <span
        className="font-ui font-medium uppercase"
        style={{ fontSize: 11, letterSpacing: "0.34em", color: "rgba(240,237,232,0.5)" }}
      >
        Find us on
      </span>
      <div className="flex justify-center gap-4">
        {BADGES.map((b) => {
          const isExternal = b.href.startsWith("http");
          return (
            <a
              key={b.label}
              href={b.href}
              aria-label={b.label}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="group flex h-[56px] w-[56px] items-center justify-center rounded-full border border-bg-light/25 text-bg-light transition-all duration-300 hover:scale-[1.1] hover:border-accent hover:bg-accent hover:text-bg-dark"
              style={{ backdropFilter: "blur(4px)" }}
            >
              {b.icon}
            </a>
          );
        })}
      </div>
    </div>
  );
}
