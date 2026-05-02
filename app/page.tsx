import HeroSection from "@/sections/hero/HeroSection";
import HeroCurtainWipe from "@/sections/hero/HeroCurtainWipe";
import ManifestoSection from "@/sections/manifesto/ManifestoSection";
import SpotlightSection from "@/sections/spotlight/SpotlightSection";
import CarouselSection from "@/sections/carousel/CarouselSection";
import StatsSection from "@/sections/stats/StatsSection";
import FeatureSlamSection from "@/sections/feature-slam/FeatureSlamSection";
import MarqueeSection from "@/sections/marquee/MarqueeSection";
import SocialProofSection from "@/sections/social-proof/SocialProofSection";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HeroCurtainWipe />
      <ManifestoSection />
      <SpotlightSection />
      <CarouselSection />
      <StatsSection />
      <FeatureSlamSection />
      <MarqueeSection />
      <SocialProofSection />
      <Footer />
    </main>
  );
}
