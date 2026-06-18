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

export default function FavoritesPage() {
  const { user, isLoaded } = useUser();

  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);
  const footerTop = favoriteProducts.length > 0 ? 1200 : 900;
  const customHeight = footerTop + 480;

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
                href={`/products/${product.slug}`}
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
  );
}