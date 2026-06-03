import Image from "next/image";
import Link from "next/link";
import { FooterSection } from "@/components/home/FooterSection";
import { collections } from "@/lib/products";
import { FigmaScaler } from "@/components/FigmaScaler";
import { FIGMA_HOME } from "@/lib/figma-home";
export default function CollectionsPage() {
  const customHeight = 1280;
  const footerTop = 803;
  return (
    <div className="bg-anna-background" style={{ overflowX: "hidden" }}>
      <FigmaScaler customHeight={customHeight}>
        <main
          className="relative bg-anna-background pt-[124px] text-anna-foreground"
          style={{
            width: FIGMA_HOME.width,
            height: customHeight,
          }}
        >
      <section className="mx-auto w-full max-w-site px-[24px] sm:px-[50px]">
        <h1 className="flex items-baseline gap-[12px] text-anna-foreground">
          <span className="font-display text-[52px] font-normal leading-none">
            All
          </span>
          <span className="font-script text-[52px] font-normal leading-none">
            Collections
          </span>
        </h1>

        <section className="mt-[72px] grid grid-cols-1 gap-[30px] md:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="group relative block aspect-[405/476] overflow-hidden rounded-[10px] bg-anna-cream"
            >
              <Image
                src={collection.cardImage}
                alt={collection.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(min-width: 768px) 31vw, 100vw"
              />
              <span className="absolute left-[18px] top-[18px] rounded-[6px] border border-black/85 bg-white/10 px-[22px] py-[12px] font-display text-[32px] leading-none text-anna-foreground">
                {collection.label}
              </span>
            </Link>
          ))}
        </section>
      </section>

          <FooterSection style={{ top: footerTop }} />
        </main>
      </FigmaScaler>
    </div>
  );
}
