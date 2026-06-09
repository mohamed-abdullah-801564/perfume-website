import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionProductsSection } from "@/components/collections/CollectionProductsSection";
import {
  collections,
  getCollectionBySlug,
  products,
} from "@/lib/products";
import { FigmaScaler } from "@/components/FigmaScaler";
import { FIGMA_HOME } from "@/lib/figma-home";
import { FooterSection } from "@/components/home/FooterSection";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

type Props = { params: Promise<{ slug: string }> }

export default async function CollectionCategoryPage({
  params,
}: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const otherCollections = collections.filter((item) => item.slug !== collection.slug);
  const customHeight = 2450;
  const footerTop = 1970;
  return (
    
    <div className="relative bg-anna-background">
    <FigmaScaler customHeight={customHeight}>
     <main
              className="relative bg-anna-background"
              style={{
                width: FIGMA_HOME.width,
                height: customHeight,
              }}
            >
      <section className="mx-auto w-full max-w-site px-[24px] sm:px-[50px] pt-[124px]">
        <h1 className="flex items-baseline gap-[12px] text-anna-foreground">
          <span className="font-display text-[72px] font-normal leading-none">
            {collection.label.replace(" Mix", "")}
          </span>
          {collection.label.includes("Mix") ? (
            <span className="font-script text-[72px] font-normal leading-none">
              Mix
            </span>
          ) : null}
        </h1>

        <div className="relative mt-[20px] aspect-[1340/490] w-full overflow-hidden rounded-[10px]">
          <Image
            src={collection.heroImage}
            alt={collection.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <CollectionProductsSection
          products={products}
          initialCategory={collection.category}
        />

        <section className="mt-[88px]">
          <h2 className="flex items-baseline gap-[12px]">
            <span className="font-display text-[52px] font-bold leading-none">
              Other
            </span>
            <span className="font-script text-[52px] leading-none">
              Collections
            </span>
          </h2>

          <div className="mx-auto mt-[42px] grid max-w-[640px] grid-cols-1 gap-[24px] sm:grid-cols-2">
            {otherCollections.map((item) => (
              <Link
                key={item.slug}
                href={`/collections/${item.slug}`}
                className="group relative aspect-[405/476] overflow-hidden rounded-[10px] bg-anna-cream"
              >
                <Image
                  src={item.cardImage}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="320px"
                />
                <span className="absolute left-[12px] top-[12px] rounded-[6px] border border-black/85 bg-white/10 px-[16px] py-[9px] font-display text-[20px] leading-none">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </section>

    </main>
   <FooterSection style={{ top: footerTop }} />
     </FigmaScaler>
    </div>
  );
}
