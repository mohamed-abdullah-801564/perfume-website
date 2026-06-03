import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/home/FooterSection";
import { FigmaScaler } from "@/components/FigmaScaler";
import { FIGMA_HOME } from "@/lib/figma-home";
export default function BrandPage() {
  const customHeight = 3551;
  const footerTop = 3074;
  return (
    <FigmaScaler customHeight={customHeight}>
     <main
              className="relative bg-anna-background"
              style={{
                width: FIGMA_HOME.width,
                height: customHeight,
              }}
            >
      


      <section className="mx-auto w-full max-w-site pt-[119px]">
        <div className="px-[54px]">
          <h1 className="font-script text-[64px] font-normal leading-none text-anna-foreground">
            About us
          </h1>
          <p className="mt-2 font-display text-[27px] font-normal leading-[1.24] text-anna-foreground">
            At Annavalam, we believe true beauty and health begin with nature. Inspired by timeless Siddha
            <br />
            wisdom and traditional ingredients, we craft products that nourish the body inside and out from
            <br />
            wholesome health mixes and Karuppu Kavuni Kanji Mix to deeply nourishing hair oils and
            <br />
            herbal face packs.
          </p>
        </div>

        <div className="relative mt-4 h-[653px] w-full overflow-hidden">
          <Image
            src="/brand-images/image 33.png"
            alt="Traditional herbs, grains, and spices for Annavalam products"
            fill
            priority
            className="object-cover"
            sizes="1440px"
          />
        </div>

        <section className="grid min-h-[685px] grid-cols-[640px_731px] items-center gap-[48px] px-[34px]">
          <div className="flex flex-col items-end pr-[2px] text-right">
            <p className="font-script text-[40px] font-normal leading-none text-anna-foreground">
              Sustainability
            </p>
            <h2 className="-mt-1 font-display text-[42px] font-normal leading-none text-anna-foreground">
              Responsibly sourced
            </h2>
            <p className="mt-5 w-[560px] font-sans text-[23px] font-normal leading-[1.16] text-anna-foreground">
              We&apos;re proud to source our ingredients responsibly,
              <br />
              placing a high emphasis on ethical and sustainable
              <br />
              methods. This ensures that our supplements not
              <br />
              only offer you health benefits, but also promote a
              <br />
              healthier planet.
            </p>
          </div>

          <div className="relative h-[606px] w-[731px] overflow-hidden rounded-[10px]">
            <Image
              src="/brand-images/Tote Bag.png"
              alt="Anna Valam tote bag with botanical ingredients"
              fill
              className="object-cover"
              sizes="731px"
            />
          </div>
        </section>

        <section className="grid min-h-[606px] grid-cols-[731px_1fr] items-center gap-[23px] px-[34px] pb-[74px]">
          <div className="relative h-[606px] w-[731px] overflow-hidden rounded-[10px]">
            <Image
              src="/brand-images/Tote Bag-1.png"
              alt="Natural oil drop above amber bottle"
              fill
              className="object-cover"
              sizes="731px"
            />
          </div>

          <div className="pl-0 pt-[18px] text-left">
            <p className="font-script text-[40px] font-normal leading-none text-anna-foreground">
              All natural
            </p>
            <h2 className="-mt-1 font-display text-[42px] font-normal leading-none text-anna-foreground">
              Consciously formulated
            </h2>
            <p className="mt-3 w-[560px] font-sans text-[23px] font-normal leading-[1.16] text-anna-foreground">
              We take a thoughtful and meticulous approach to our
              <br />
              development process, ensuring that every step is
              <br />
              rigorous and uncompromising in our pursuit of highly
              <br />
              effective yet gentle skincare that delivers visible
              <br />
              results.
            </p>
          </div>
        </section>

        <section className="grid min-h-[664px] grid-cols-[560px_560px] justify-center gap-[58px] pt-[12px]">
          <Link href="/values" className="relative h-[540px] w-[560px] overflow-hidden rounded-[10px] block hover:opacity-95 transition-opacity">
            <Image
              src="/brand-images/Rectangle 32.png"
              alt=""
              fill
              className="object-cover"
              sizes="560px"
            />
            <div className="absolute bottom-[20px] left-[20px] flex h-[54px] w-[180px] items-center justify-center rounded-[6px] border border-white/85 bg-white/5">
              <span className="font-display text-[38px] font-normal leading-none text-white">
                Values
              </span>
            </div>
          </Link>

          <Link href="/ingredients" className="relative h-[540px] w-[560px] overflow-hidden rounded-[10px] block hover:opacity-95 transition-opacity">
            <Image
              src="/brand-images/Rectangle 33.png"
              alt=""
              fill
              className="object-cover"
              sizes="560px"
            />
            <div className="absolute bottom-[20px] left-[20px] flex h-[54px] w-[266px] items-center justify-center rounded-[6px] border border-black/85 bg-white/5">
              <span className="font-display text-[38px] font-normal leading-none text-anna-foreground">
                Ingredients
              </span>
            </div>
          </Link>
        </section>
      </section>

      
        <FooterSection style={{ top: footerTop }} />
    </main>
    </FigmaScaler>
  );
}
