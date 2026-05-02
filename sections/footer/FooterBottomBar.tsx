export default function FooterBottomBar() {
  return (
    <div
      className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-bg-light/12 pt-8 md:flex-row"
    >
      <p
        className="font-ui text-[11px] uppercase tracking-[0.12em]"
        style={{ color: "rgba(240,237,232,0.34)" }}
      >
        © 2026 LEGEND VAPE STORE — All rights reserved.
      </p>

      <div className="flex flex-col items-center gap-1 md:flex-row md:gap-6">
        <p
          className="font-ui text-[11px] uppercase tracking-[0.18em]"
          style={{ color: "rgba(200,169,110,0.7)" }}
        >
          18+ only — contains nicotine
        </p>
        <span aria-hidden className="hidden h-3 w-px bg-bg-light/15 md:block" />
        <p
          className="font-ui text-[11px] uppercase tracking-[0.12em]"
          style={{ color: "rgba(240,237,232,0.34)" }}
        >
          Privacy · Terms · Cookies
        </p>
      </div>
    </div>
  );
}
