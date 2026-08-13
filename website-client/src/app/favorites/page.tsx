"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useSupabase } from "@/lib/supabase";
import { products } from "@/lib/products";
// import { SiteFooter } from "@/components/SiteFooter";
import { FooterSection } from "@/components/home/FooterSection";
import { FigmaScaler } from "@/components/FigmaScaler";
import { FIGMA_HOME } from "@/lib/figma-home";
import { MobileFooter } from "@/components/MobileFooter";

export default function FavoritesPage() {
  const { user, isLoaded } = useUser();
  const { getClient } = useSupabase();

  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const footerTop = favoriteProducts.length > 0 ? 1200 : 900;
  const customHeight = footerTop + 477; // footerTop + 477 (footer height)

  useEffect(() => {
    if (!isLoaded) return;

    const fetchFavorites = async () => {
      setLoading(true);
      try {
        if (!user) {
          // Guest User: Read directly from localStorage
          const stored = localStorage.getItem("anna_favorites");
          if (stored) {
            const slugs = JSON.parse(stored);
            const matchedProducts = products.filter((product) =>
              slugs.includes(product.slug)
            );
            setFavoriteProducts(matchedProducts);
          } else {
            setFavoriteProducts([]);
          }
          return;
        }

        // Logged-in User: use authenticated Supabase client
        const client = await getClient();

        // 1. Sync/Merge local storage favorites if any exist
        const stored = localStorage.getItem("anna_favorites");
        if (stored) {
          try {
            const localSlugs = JSON.parse(stored);
            if (Array.isArray(localSlugs) && localSlugs.length > 0) {
              const { data: dbFavorites, error: favError } = await client
                .from("favorites")
                .select("product_slug")
                .eq("user_id", user.id);

              if (!favError) {
                const dbSlugs = new Set((dbFavorites || []).map((f) => f.product_slug));
                const toInsert = localSlugs.filter((slug) => typeof slug === "string" && !dbSlugs.has(slug));

                if (toInsert.length > 0) {
                  const insertData = toInsert.map((slug) => ({
                    user_id: user.id,
                    product_slug: slug,
                  }));
                  await client.from("favorites").insert(insertData);
                }
              }
            }
          } catch (e) {
            console.error("Failed to sync favorites on favorites page:", e);
          } finally {
            localStorage.removeItem("anna_favorites");
          }
        }

        // 2. Fetch all favorites from Supabase
        const { data, error } = await client
          .from("favorites")
          .select("product_slug")
          .eq("user_id", user.id);

        if (error) throw error;

        const slugs = data ? data.map((item) => item.product_slug) : [];
        const matchedProducts = products.filter((product) =>
          slugs.includes(product.slug)
        );
        setFavoriteProducts(matchedProducts);
      } catch (err) {
        console.error("Failed to fetch database favorites, falling back to localStorage:", err);
        // Fallback to localStorage gracefully
        try {
          const stored = localStorage.getItem("anna_favorites");
          if (stored) {
            const slugs = JSON.parse(stored);
            const matchedProducts = products.filter((product) =>
              slugs.includes(product.slug)
            );
            setFavoriteProducts(matchedProducts);
          } else {
            setFavoriteProducts([]);
          }
        } catch (localErr) {
          console.error("Failed to load local favorites fallback:", localErr);
          setFavoriteProducts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, isLoaded, getClient]);

  if (!isLoaded || loading) {
    return (
      <div className="relative bg-anna-background min-h-screen flex flex-col justify-center items-center text-anna-brand">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-anna-brand border-t-transparent mb-4"></div>
          <p className="font-display text-lg tracking-wide animate-pulse">Loading your collection...</p>
        </div>
      </div>
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
                        <div className="relative aspect-[3/4] bg-anna-cream">
                          <Image
                            src={product.detailSrc}
                            alt={product.name}
                            fill
                            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
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
      <div className="xl:hidden bg-anna-background text-anna-foreground min-h-screen flex flex-col pt-[140px]">
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
                  <div className="relative aspect-[3/4] w-full bg-anna-cream">
                    <Image
                      src={product.detailSrc}
                      alt={product.name}
                      fill
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
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