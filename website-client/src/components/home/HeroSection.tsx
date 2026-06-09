import { FigmaImage } from "./FigmaLayer";
import { FigmaLayer } from "./FigmaLayer";
import { PromoChip } from "./PromoChip";

/** Hero + header — Figma layers from y=0 through y=823 (brand band follows) */
export function HeroSection() {
  return (
    <>
      <FigmaImage
        x={-42}
        y={52}
        width={360}
        height={480}
        src="/images/image 19.png"
        alt=""
        objectFit="fill"
        zIndex={4}
      />
      <FigmaLayer
        x={1122}
        y={52}
        width={360}
        height={480}
        zIndex={4}
        className="overflow-hidden"
        style={{
          backgroundImage: "url('/images/image 19.png')",
          backgroundSize: "100% 100%",
          transform: "scaleX(-1)",
        }}
      />
      <FigmaImage
        x={-42}
        y={370}
        width={360}
        height={480}
        src="/images/image 19.png"
        alt=""
        objectFit="fill"
        zIndex={4}
      />
      <FigmaLayer
        x={1122}
        y={370}
        width={360}
        height={480}
        zIndex={4}
        className="overflow-hidden"
        style={{
          backgroundImage: "url('/images/image 19.png')",
          backgroundSize: "100% 100%",
          transform: "scaleX(-1)",
        }}
      />

      {/* Tradition That Nourishes Beauty. — 187,145 408×359 Italianno 86 */}
      <p
        className="text-script-display-md absolute left-[187px] top-[145px] z-10 w-[408px] text-anna-foreground"
        style={{ height: 359 }}
      >
        Tradition That Nourishes Beauty.
      </p>

      {/* Glow the Siddha Way. — 820,325 410×283 Italianno 96 right */}
      <p
        className="text-script-display absolute left-[820px] top-[325px] z-10 w-[410px] text-right text-anna-foreground"
        style={{ height: 283 }}
      >
        Glow the Siddha Way.
      </p>

      {/* black rice mix hero — 467,53 492.75×683.69 (resized, shifted and rotated to sit in hand) */}
      <FigmaImage
        x={525}
        y={130}
        width={380}
        height={527}
        src="/images/hero-product.png"
        alt="Anna Valam black rice mix"
        objectFit="cover"
        priority
        zIndex={5}
        style={{ transform: "rotate(9deg)" }}
      />

      {/* image 16 — 467,547 506×289.95 (shifted to the right under the pouch) */}
      <FigmaImage
        x={480}
        y={578}
        width={506}
        height={290}
        src="/images/image 16.png"
        alt=""
        objectFit="fill"
        zIndex={4}
      />

      <FigmaImage
        x={530}
        y={547}
        width={0}
        height={0}
        src="/images/image 16.png"
        alt=""
        objectFit="fill"
        zIndex={4}
      />

      {/* Group 9 promo chip — kept above the hero product and linked to health mix */}
      <PromoChip x={415} y={565} imagePosition="right" href="/product/multigrain-health-mix" />
    </>
  );
}
