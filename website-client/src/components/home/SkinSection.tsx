import { FigmaImage } from "./FigmaLayer";

export function SkinSection() {
  return (
    <>
      {/* Why your Skin — 51,1911 389×76 */}
      <h2
        id="skin-heading"
        className="text-heading-section absolute left-[51px] top-[1911px] z-10"
        style={{ width: 389, height: 76 }}
      >
        Why your Skin
      </h2>

      {/* Deserves the best — 51,1979 284×80 Italianno 64 */}
      <p
        className="text-script-display-sm absolute left-[51px] top-[1979px] z-10 text-anna-foreground"
        style={{ width: 284, height: 80 }}
      >
        Deserves the best
      </p>

      {/* proven — 160,2542 */}
      <p
        className="absolute left-[160px] top-[2542px] z-20 font-display text-anna-title-sm font-bold leading-none text-anna-foreground"
        style={{ width: 100, height: 37 }}
      >
        proven
      </p>
      {/* Effectiveness — 160,2571 */}
      <p
        className="absolute left-[160px] top-[2570px] z-20 font-script text-[32px] leading-none text-anna-foreground"
        style={{ width: 106, height: 40 }}
      >
        Effectiveness
      </p>
      {/* body copy — 160,2606 */}
      <p
        className="absolute left-[160px] top-[2605px] z-20 font-sans text-[14px] leading-[1.12] text-anna-charcoal"
        style={{ width: 296, height: 36 }}
      >
        every product is carefully crafted to meet
        <br />
        the highest quality standards
      </p>

      {/* image 11 — 124,2101 560.65×578.49 */}
      <FigmaImage
        x={124}
        y={2101}
        width={560.65}
        height={578.49}
        src="/images/lifestyle-botanical.png"
        alt="Botanical ingredients"
        borderRadius={15}
        zIndex={10}
      />

      {/* Rectangle 24 — 148,2542 346×109 */}
      <div
        className="absolute left-[148px] top-[2542px] z-[19] rounded-chip bg-white"
        style={{ width: 346, height: 109 }}
        aria-hidden
      />
    </>
  );
}
