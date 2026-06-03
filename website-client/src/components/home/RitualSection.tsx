import Image from "next/image";
import { FigmaImage } from "./FigmaLayer";
import { FigmaLayer } from "./FigmaLayer";
import { PromoChip } from "./PromoChip";

export function RitualSection() {
  return (
    <>
      {/* Eco-friendly / Packaging — 843,2115 */}
      <p
        className="absolute left-[843px] top-[2115px] z-10 font-script text-anna-heading-md text-right text-anna-foreground"
        style={{ width: 174, height: 39 }}
      >
        Eco-friendly
      </p>
      <p
        className="absolute left-[1030px] top-[2115px] z-10 font-display text-anna-heading-md text-right text-anna-foreground"
        style={{ width: 201, height: 57 }}
      >
        Packaging
      </p>
      <p
        className="absolute left-[858px] top-[2219px] z-10 font-rem text-anna-body font-light text-anna-foreground"
        style={{ width: 343, height: 75 }}
      >
        Eco-friendly packaging materials designed to care for the planet as much
        as your skin
      </p>

      {/* image 29 — 711,2103 562×308 */}
      <FigmaImage
        x={711}
        y={2103}
        width={562}
        height={308}
        src="/images/image 29.png"
        alt="Eco-friendly packaging"
        borderRadius={15}
        zIndex={10}
      />

      {/* Group 6 — 667,2436 606×240 (image 28: 416×240) */}
      <FigmaLayer x={711} y={2436} width={562} height={240} zIndex={10}>
        <div className="relative h-full w-full overflow-hidden rounded-card bg-anna-brand">
          <div
            className="absolute left-0 top-0 overflow-hidden"
            style={{ width: 416, height: 240 }}
          >
            <Image
              src="/images/siddha-ritual-54332e.png"
              alt="Siddha ritual"
              fill
              className="object-cover object-left"
              sizes="416px"
            />
          </div>
        </div>
      </FigmaLayer>

      {/* Nature's Wisdom — 109,2760 497×240 */}
      <p
        className="text-script-display absolute left-[109px] top-[2760px] z-10 text-anna-foreground"
        style={{ width: 497, height: 240 }}
      >
        Nature&apos;s Wisdom, Beautifully Yours.
      </p>

      {/* 100% Natural / 100% You — 1023,2507 */}
      <p
        className="absolute left-[1023px] top-[2507px] z-10 font-display text-anna-heading-sm font-bold text-anna-cream"
        style={{ width: 229, height: 47 }}
      >
        100% Natural
      </p>
      <p
        className="absolute left-[1023px] top-[2554px] z-10 font-script text-[40px] leading-none text-anna-cream"
        style={{ width: 116, height: 50 }}
      >
        100% You
      </p>

      {/* Your Daily Siddha Ritual. — 873,3317 423×240 */}
      <p
        className="text-script-display absolute left-[873px] top-[3317px] z-10 text-right text-anna-foreground"
        style={{ width: 423, height: 240 }}
      >
        Your Daily Siddha Ritual.
      </p>

      <div
        className="pointer-events-none absolute left-[390px] top-[3318px] z-[4] h-[190px] w-[640px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.34) 0%, rgba(0, 0, 0, 0.22) 34%, rgba(0, 0, 0, 0.08) 62%, rgba(0, 0, 0, 0) 78%)",
          filter: "blur(24px)",
          transform: "rotate(-4deg)",
        }}
        aria-hidden
      />

      {/* image 12 botanical — rosemary oil bottle from supplied asset */}
      <FigmaImage
        x={635}
        y={2812}
        width={375}
        height={645}
        src="/images/hero-botanical-608f3c.png"
        alt=""
        objectFit="contain"
        zIndex={7}
        style={{ transform: "rotate(6deg)" }}
      />

      {/* image 30 glow — 338,3309 736×326 */}
      <div
        className="hidden"
        style={{ width: 736, height: 326 }}
        aria-hidden
      >
        <div className="relative h-full w-full blur-[71px]">
          <Image
            src="/images/hero-botanical-608f3c.png"
            alt=""
            fill
            className="object-cover"
            sizes="736px"
          />
        </div>
      </div>

      {/* Promo chips — 453,3000 and 706,3344 */}
      <PromoChip x={565} y={2968} imagePosition="right" />
      <PromoChip x={825} y={3188} imagePosition="left" />
    </>
  );
}
