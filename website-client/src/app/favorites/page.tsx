"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { products } from "@/lib/products";
// import { SiteFooter } from "@/components/SiteFooter";
import { FooterSection } from "@/components/home/FooterSection";
import { FigmaScaler } from "@/components/FigmaScaler";
import { FIGMA_HOME } from "@/lib/figma-home";
import { MobileFooter } from "@/components/MobileFooter";

export default function FavoritesPage() {
  const { user, isLoaded } = useUser();

  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);
  const footerTop = favoriteProducts.length > 0 ? 1200 : 900;
  const customHeight = footerTop + 477; // footerTop + 477 (footer height)

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("favorites")
        .select("product_slug")
        .eq("user_id", user.id);

      if (!data) return;

      const slugs = data.map((item) => item.product_slug);

      const matchedProducts = products.filter((product) =>
        slugs.includes(product.slug)
      );

      setFavoriteProducts(matchedProducts);
    };

    fetchFavorites();
  }, [user]);

  if (!isLoaded) return null;

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-anna-background">
        <h1 className="text-3xl font-display">
          Please sign in to view favorites
        </h1>
      </main>
    );
  }

  return (
    <div className="relative bg-anna-background">
      {/* Desktop view */}
      <div className="hidden xl:block">
        <FigmaScaler customHeight={customHeight}>
          <main
            className="relative bg-anna-background"
            style={{
              width: FIGMA_HOME.width,
              height: customHeight,
            }}
          >
            <section className="mx-auto w-full max-w-site px-[54px] pt-[140px]">
              <h1 className="font-script text-[64px] font-normal leading-none text-anna-foreground mb-10">
                My Favorites
              </h1>

              {favoriteProducts.length === 0 ? (
                <div className="rounded-xl bg-white p-20 text-center mb-[120px]">
                  <p className="font-display text-3xl">
                    No favorites yet.
                  </p>
                </div>
              ) : (
                <div className="mt-[40px] grid grid-cols-4 gap-[28px] pb-[120px]">
                  {favoriteProducts.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/product/${product.slug}`}
                      className="group"
                    >
                      <div className="overflow-hidden rounded-lg bg-white">
                        <div className="relative aspect-[3/4]">
                          <Image
                            src={product.detailSrc}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        <div className="p-4">
                          <h3 className="font-display text-xl">
                            {product.name}
                          </h3>

                          <p className="mt-2 text-lg">
                            ₹{product.priceValue}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            <FooterSection style={{ top: footerTop }} />
          </main>
        </FigmaScaler>
      </div>

      {/* Mobile view */}
      <div className="xl:hidden bg-anna-background text-anna-foreground min-h-screen flex flex-col pt-16">
        <main className="flex-grow px-4 py-6 sm:px-8">
          <h1 className="font-display text-[32px] font-normal mb-6">
            My Favorites
          </h1>

          {favoriteProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-black/5 px-4">
              <p className="font-sans text-lg text-anna-charcoal mb-4">No favorites yet.</p>
              <Link href="/collections" className="inline-block rounded bg-anna-brand px-6 py-2.5 font-display text-white">
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 sm:grid-cols-2">
              {favoriteProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className="group block overflow-hidden rounded-lg bg-white border border-black/5"
                >
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={product.detailSrc}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 400px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-display text-base font-bold leading-snug">{product.name}</h3>
                    <p className="mt-1 font-sans text-sm font-bold text-anna-copper">₹{product.priceValue}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
        <MobileFooter />
      </div>
    </div>
  );
}