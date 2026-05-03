import HeroSection from "@/sections/hero/HeroSection";
import HeroCurtainWipe from "@/sections/hero/HeroCurtainWipe";
import ManifestoSection from "@/sections/manifesto/ManifestoSection";
import SpotlightSection from "@/sections/spotlight/SpotlightSection";
import CarouselSection from "@/sections/carousel/CarouselSection";
import StatsSection from "@/sections/stats/StatsSection";
import FeatureSlamSection from "@/sections/feature-slam/FeatureSlamSection";
import SocialProofSection from "@/sections/social-proof/SocialProofSection";
import InstagramFeed from "@/sections/instagram/InstagramFeed";
import LocationsSection from "@/sections/locations/LocationsSection";
import Footer from "@/components/layout/Footer";

import PresentationSnap from "@/sections/PresentationSnap";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HeroCurtainWipe />
      <ManifestoSection />
      <SpotlightSection />
      <CarouselSection />
      <PresentationSnap>
        <StatsSection />
        <FeatureSlamSection />
      </PresentationSnap>
      <SocialProofSection />
      <InstagramFeed />
      <LocationsSection />
      <Footer />
    </main>
  );
}
