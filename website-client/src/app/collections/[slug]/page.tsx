import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionsFooter } from "@/components/collections/CollectionsFooter";
import { ProductCard } from "@/components/collections/ProductCard";
import {
  collections,
  getCollectionBySlug,
  getProductsByCategory,
} from "@/lib/products";
import { FigmaScaler } from "@/components/FigmaScaler";
import { FIGMA_HOME } from "@/lib/figma-home";
import { FooterSection } from "@/components/home/FooterSection";
const filterGroups = [
  { label: "Collections", options: ["New Arrivals", "Bestsellers", "On Sale", "Kits"] },
  { label: "Type", options: ["Cream", "Lotion", "Cleanser", "Oil", "Serum"] },
  { label: "Price", options: [] },
  { label: "Size", options: [] },
];

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

  const categoryProducts = getProductsByCategory(collection.category);
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

        <section className="mt-[40px] grid grid-cols-1 gap-[34px] lg:grid-cols-[240px_1fr]">
          <aside className="rounded-[10px] bg-white px-[28px] py-[28px]">
            <h2 className="font-display text-[24px] font-bold leading-none">
              Filter (0)
            </h2>
            <div className="mt-[22px] space-y-[22px]">
              {filterGroups.map((group) => (
                <div key={group.label} className="border-t border-black/15 pt-[16px]">
                  <div className="flex items-center justify-between font-display text-[20px] font-bold leading-none">
                    <span>{group.label}</span>
                    <span>⌄</span>
                  </div>
                  {group.options.length > 0 ? (
                    <div className="mt-[14px] space-y-[10px]">
                      {group.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-[8px] font-sans text-[13px] leading-none"
                        >
                          <input type="checkbox" className="h-[12px] w-[12px]" />
                          {option}
                        </label>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </aside>

          <div className="grid grid-cols-1 gap-x-[42px] gap-y-[42px] sm:grid-cols-2 xl:grid-cols-3">
            {categoryProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

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
