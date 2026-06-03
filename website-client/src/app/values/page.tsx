import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/home/FooterSection";
import { FigmaScaler } from "@/components/FigmaScaler";
import { FIGMA_HOME } from "@/lib/figma-home";

export default function ValuesPage() {
  // Hero: 624px
  // Values section: ~320px
  // Gap before cards: 142px
  // Cards section: ~720px
  // Footer height: ~477px (same as brand page: 3551 - 3074)
  const footerHeight = 477;
  const contentHeight = 624 + 320 + 142 + 720; // 1806
  const footerTop = contentHeight;
  const customHeight = contentHeight + footerHeight; // 2283

  return (
    <FigmaScaler customHeight={customHeight}>
      <main
        className="relative bg-anna-background"
        style={{
          width: FIGMA_HOME.width,
          height: customHeight,
        }}
      >
        <section className="mx-auto w-full max-w-site">

          {/* Hero Image — full width */}
          <div className="relative h-[624px] w-full overflow-hidden">
            <Image
              src="/brand-images/image 34.png"
              alt="Green hills under a cloudy sky"
              fill
              priority
              className="object-cover"
              sizes="1440px"
            />
            <h1 className="absolute left-[56px] top-[383px] z-10 w-[292px] text-white">
              <span className="block font-serif text-[76px] font-normal leading-[0.78]">
                Our
              </span>
              <span className="block font-script text-[88px] font-normal leading-[0.72]">
                Values
              </span>
            </h1>
          </div>

          {/* Three values columns */}
          <section className="grid grid-cols-3 gap-[80px] px-[56px] pt-[22px] pb-[60px]">
            <article>
              <h2 className="border-b border-anna-foreground/70 pb-[2px] font-display text-[30px] font-normal leading-none text-anna-foreground">
                Purity from Nature
              </h2>
              <p className="mt-[14px] font-sans text-[24px] font-normal leading-[1.07] text-anna-foreground">
                We value ingredients in their most natural and beneficial form,
                free from unnecessary additives and artificial compromises.
              </p>
            </article>

            <article>
              <h2 className="border-b border-anna-foreground/70 pb-[2px] font-display text-[30px] font-normal leading-none text-anna-foreground">
                Rooted in Tradition
              </h2>
              <p className="mt-[14px] font-sans text-[24px] font-normal leading-[1.07] text-anna-foreground">
                Inspired by traditional Siddha wellness practices, we honour
                ancient knowledge while adapting it for modern lifestyles.
              </p>
            </article>

            <article>
              <h2 className="border-b border-anna-foreground/70 pb-[2px] font-display text-[30px] font-normal leading-none text-anna-foreground">
                Honest Wellness
              </h2>
              <p className="mt-[14px] font-sans text-[24px] font-normal leading-[1.07] text-anna-foreground">
                We believe wellness should be authentic, transparent, and
                accessible built on trust and integrity.
              </p>
            </article>
          </section>

          {/* Image cards — two column, full width */}
          <section className="grid grid-cols-[520px_520px] justify-center gap-[72px] pt-[142px]">
            <Link
              href="/brand"
              className="relative h-[510px] w-[520px] overflow-hidden rounded-[10px] block hover:opacity-95 transition-opacity"
            >
              <Image
                src="/brand-images/image 35.png"
                alt=""
                fill
                className="object-cover"
                sizes="520px"
              />
              <div className="absolute bottom-[22px] left-[22px] flex h-[54px] w-[187px] items-center justify-center rounded-[6px] border border-white/85 bg-white/5">
                <span className="font-display text-[38px] font-normal leading-none text-white">
                  About us
                </span>
              </div>
            </Link>

            <Link
              href="/ingredients"
              className="relative h-[510px] w-[520px] overflow-hidden rounded-[10px] block hover:opacity-95 transition-opacity"
            >
              <Image
                src="/brand-images/Rectangle 33.png"
                alt=""
                fill
                className="object-cover"
                sizes="520px"
              />
              <div className="absolute bottom-[22px] left-[22px] flex h-[54px] w-[266px] items-center justify-center rounded-[6px] border border-black/85 bg-white/5">
                <span className="font-display text-[38px] font-normal leading-none text-anna-foreground">
                  Ingredients
                </span>
              </div>
            </Link>
          </section>

        </section>

        {/* Footer — absolutely positioned just like BrandPage */}
        <FooterSection style={{ top: footerTop }} />
      </main>
    </FigmaScaler>
  );
}