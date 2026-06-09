import { BrandBand } from "@/components/home/BrandBand";
import { FooterSection } from "@/components/home/FooterSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { RitualSection } from "@/components/home/RitualSection";
import { SkinSection } from "@/components/home/SkinSection";
import { FigmaScaler } from "@/components/FigmaScaler";
import { FIGMA_HOME } from "@/lib/figma-home";
import { MobileHome } from "@/components/home/MobileHome";

/**
 * Home page — frame 67:3
 * Single 1440×4028 canvas scaled to fit the viewport — no horizontal scrollbar.
 */
export default function HomePage() {
  return (
    <>
      <MobileHome />
      <div className="hidden bg-anna-background xl:block" style={{ overflowX: "hidden" }}>
        <FigmaScaler>
          <main
            className="relative bg-anna-background"
            style={{
              width: FIGMA_HOME.width,
              height: FIGMA_HOME.height,
            }}
          >
            <HeroSection />
            <BrandBand />
            <ProductsSection />
            <SkinSection />
            <RitualSection />
            <FooterSection />
          </main>
        </FigmaScaler>
      </div>
    </>
  );
}
