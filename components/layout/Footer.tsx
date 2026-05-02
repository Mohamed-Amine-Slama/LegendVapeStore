import FooterHashtag from "@/sections/footer/FooterHashtag";
import FooterProductHero from "@/sections/footer/FooterProductHero";
import FooterSocialBadges from "@/sections/footer/FooterSocialBadges";
import FooterNavColumns from "@/sections/footer/FooterNavColumns";
import FooterEmailCapture from "@/sections/footer/FooterEmailCapture";
import FooterBottomBar from "@/sections/footer/FooterBottomBar";

export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden text-bg-light"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(140% 100% at 50% 0%, #243044 0%, #1A2332 45%, #0E1622 100%)",
      }}
      data-section="footer"
    >
      {/* Animated grain layer */}
      <div
        aria-hidden
        className="legend-vape-store-grain pointer-events-none absolute -inset-[10%] opacity-[0.05]"
        style={{
          backgroundImage:
            `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-[2] mx-auto max-w-[1500px] px-4 pb-10 sm:px-6 sm:pb-12 md:px-12">
        <FooterHashtag />
        <FooterProductHero />
        <FooterSocialBadges />

        <div className="mt-14 grid grid-cols-1 gap-10 sm:mt-20 md:mt-24 md:grid-cols-[1fr_360px] md:gap-12">
          <FooterNavColumns />
          <FooterEmailCapture />
        </div>

        <FooterBottomBar />
      </div>
    </footer>
  );
}
