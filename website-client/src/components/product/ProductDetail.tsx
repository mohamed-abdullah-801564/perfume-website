"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { KeyIngredientsSection } from "@/components/product/KeyIngredientsSection";
import { OtherProductsSection } from "@/components/product/OtherProductsSection";
import { SiteFooter } from "@/components/SiteFooter";
import { FigmaScaler } from "@/components/FigmaScaler";
import { FIGMA_HOME } from "@/lib/figma-home";
import { FooterSection } from "../home/FooterSection";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";
import { MobileFooter } from "@/components/MobileFooter";
const accordionRows = ["How to use", "Benefits", "Ingredients"];

export function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isFavorite, setIsFavorite] = useState(false);
  const footerTop = 3500;
  const customHeight = 4080;
  const router = useRouter();
  const { user } = useUser();
const { openSignIn } = useClerk();
  const handleAddToCart = async () => {
  if (!user) {
  toast("Sign in required", {
    description: "Please sign in to add products to your cart.",
  });

  setTimeout(() => {
    router.push("/");
  }, 1500);

  return;
}

  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_slug", product.slug)
    .eq("size", selectedSize)
    .maybeSingle();

  if (existingItem) {
    await supabase
      .from("cart_items")
      .update({
        quantity: existingItem.quantity + quantity,
      })
      .eq("id", existingItem.id);
  } else {
    await supabase
  .from("cart_items")
  .insert({
    user_id: user.id,
    product_slug: product.slug,
    product_name: product.name,
    size: selectedSize,
    quantity,
    price_value: product.priceValue,
  });
  }

  router.push("/cart");
};
const handleFavorite = async () => {
  if (!user) {
    toast.error("Please sign in to save favorites");
    return;
  }

  const { data: existing } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_slug", product.slug)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("favorites")
      .delete()
      .eq("id", existing.id);

    setIsFavorite(false);
    toast.success("Removed from favorites");
  } else {
    await supabase
      .from("favorites")
      .insert({
        user_id: user.id,
        product_slug: product.slug,
      });

    setIsFavorite(true);
    toast.success("Added to favorites");
  }
};

  return (
    <div className="relative bg-anna-background">
      {/* Desktop view */}
      <div className="hidden xl:block">
        <FigmaScaler customHeight={customHeight}>
          <main
            className="bg-anna-background"
            style={{
              width: FIGMA_HOME.width,
              height: customHeight,
            }}
          >
            <section className="relative mx-auto min-h-screen w-full max-w-site bg-anna-background">
              <section className="grid grid-cols-[90px_459px_1fr] gap-[25px] px-[50px] pt-[140px]">
                <div className="flex flex-col gap-[24px]">
                  {["/images/black rice mix-1.png", "/images/black rice mix-2.png"].map((src) => (
                    <div
                      key={src}
                      className="relative h-[135px] w-[90px] overflow-hidden rounded-[4px] bg-anna-cream"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="90px"
                      />
                    </div>
                  ))}
                </div>

                <div className="relative h-[620px] w-[459px] overflow-hidden rounded-[6px] bg-anna-cream">
                  <Image
                    src={product.detailSrc}
                    alt={product.detailAlt}
                    fill
                    priority
                    className="object-cover"
                    sizes="459px"
                  />
                </div>

                <div className="pl-[27px] pt-[2px]">
                  <div className="flex items-start justify-between gap-8">
                    <h1 className="w-[500px] font-display text-[42px] font-normal leading-[1.16] text-anna-foreground">
                      {product.name}
                    </h1>
                    <button
                      type="button"
                      onClick={handleFavorite}
                      className="mt-[5px] flex h-[42px] w-[42px] items-center justify-center transition-transform hover:scale-105"
                      aria-label="Add to favorites"
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill={isFavorite ? "#8C4E2D" : "none"}
                        stroke={isFavorite ? "#8C4E2D" : "currentColor"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-colors duration-300"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                  </div>

                  <div className="mt-[20px] h-px w-[518px] bg-black/15" />

                  <p className="mt-[24px] w-[509px] font-sans text-[18px] font-normal leading-[1.18] text-anna-foreground">
                    {product.description}
                  </p>

                  <h2 className="mt-[28px] font-display text-[24px] font-bold leading-none text-anna-foreground">
                    Size
                  </h2>

                  <div className="mt-[16px] flex items-center gap-[20px]">
                    {product.sizes.map((size) => {
                      const isSelected = size === selectedSize;
                      const isDisabled = size === "1kg";

                      let btnStyles = "";
                      if (isDisabled) {
                        btnStyles = "bg-[#EAEAEA] text-black/25 cursor-not-allowed";
                      } else if (isSelected) {
                        btnStyles = "bg-[#8C4E2D] text-white";
                      } else {
                        btnStyles = "border border-black/35 bg-white text-black hover:border-black transition-colors";
                      }

                      return (
                        <button
                          key={size}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => setSelectedSize(size)}
                          className={`h-[36px] min-w-[55px] rounded-[4px] px-[10px] font-sans text-[14px] leading-none ${btnStyles}`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-[24px] flex items-center gap-[16px]">
                    <div className="grid h-[36px] w-[110px] grid-cols-3 items-center rounded-[3px] border border-black/15 bg-white font-sans text-[18px] font-bold">
                      <button
                        type="button"
                        className="h-full text-black/45"
                        onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-center text-[16px]">{quantity}</span>
                      <button
                        type="button"
                        className="h-full text-black"
                        onClick={() => setQuantity((value) => value + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="flex h-[36px] w-[293px] items-center justify-center gap-[10px] rounded-[3px] bg-black font-sans text-[16px] font-bold text-white hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src="/images/icon-bag.png"
                        alt=""
                        width={22}
                        height={22}
                        className="invert"
                      />
                      Add to cart
                    </button>
                  </div>

                  <p className="mt-[14px] font-sans text-[14px] font-normal leading-none text-black/45 underline cursor-pointer hover:text-black transition-colors">
                    Shipping, Exchange , Returns
                  </p>

                  <div className="mt-[34px] w-[518px]">
                    {accordionRows.map((row) => (
                      <div
                        key={row}
                        className="flex h-[53px] items-center justify-between border-b border-black/20 font-sans text-[14px] font-normal text-anna-foreground cursor-pointer hover:text-anna-copper transition-colors"
                      >
                        <span>{row}</span>
                        <span className="text-[24px] leading-none">+</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="px-[50px] pb-[104px] pt-[118px]">
                <h2 className="font-script text-[48px] font-normal leading-none text-anna-foreground">
                  FAQ
                </h2>

                <div className="ml-[93px] mt-[58px] w-[912px]">
                  {product.faqs.map((row) => (
                    <div
                      key={row}
                      className="flex h-[81px] items-center justify-between border-b border-black/45 font-sans text-[20px] font-bold text-anna-foreground"
                    >
                      <span>{row}</span>
                      <span className="pr-[19px] text-[27px] font-normal leading-none">
                        +
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="grid min-h-[700px] grid-cols-[740px_1fr] items-center gap-[96px] px-[20px] pb-[42px]">
                <div className="relative h-[620px] w-[740px] overflow-hidden rounded-[4px] bg-white">
                  <Image
                    src="/images/lifestyle-product-41aad2.png"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="740px"
                  />
                </div>

                <div className="pt-[14px]">
                  <h2 className="font-script text-[40px] font-normal leading-none text-anna-foreground">
                    Steps:
                  </h2>
                  <ul className="mt-[13px] list-disc pl-[20px] font-sans text-[18px] font-normal leading-[1.18] text-anna-foreground">
                    {product.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>
              </section>

              <KeyIngredientsSection />
              <OtherProductsSection />
            </section>
            <FooterSection style={{ top: footerTop }} />
          </main>
        </FigmaScaler>
      </div>

      {/* Mobile view */}
      <div className="xl:hidden bg-anna-background text-anna-foreground min-h-screen flex flex-col pt-16">
        <main className="flex-grow px-4 py-6 sm:px-8">
          <div className="relative aspect-[3/4] w-full max-w-[340px] mx-auto overflow-hidden rounded-lg bg-anna-cream">
            <Image
              src={product.detailSrc}
              alt={product.detailAlt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 640px) 340px, 100vw"
            />
          </div>

          <div className="mt-6">
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-display text-[28px] font-normal leading-tight text-anna-foreground">
                {product.name}
              </h1>
              <button
                type="button"
                onClick={handleFavorite}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-black/5"
                aria-label="Add to favorites"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill={isFavorite ? "#8C4E2D" : "none"}
                  stroke={isFavorite ? "#8C4E2D" : "currentColor"}
                  strokeWidth="1.5"
                  className="transition-colors duration-300"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>

            <div className="mt-3 font-display text-[24px] font-bold text-anna-copper">
              {product.price}
            </div>

            <div className="mt-4 font-sans text-sm leading-relaxed text-anna-charcoal">
              {product.description}
            </div>

            {/* Size selector */}
            <div className="mt-6">
              <span className="font-sans text-xs uppercase tracking-wider text-black/50">Size</span>
              <div className="mt-2 flex gap-2">
                {product.sizes.map((size) => {
                  const isSelected = size === selectedSize;
                  const isDisabled = size === "1kg";
                  return (
                    <button
                      key={size}
                      disabled={isDisabled}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded border px-4 py-2 font-display text-sm transition-colors ${
                        isDisabled
                          ? "bg-[#EAEAEA] text-black/25 cursor-not-allowed"
                          : isSelected
                          ? "border-anna-copper-mid bg-anna-copper-mid text-white"
                          : "border-black/15 bg-anna-cream/50 text-black"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity selector & Add to cart */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center rounded border border-black/15 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 font-display text-lg"
                >
                  -
                </button>
                <span className="px-3 font-sans text-base font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 font-display text-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-grow rounded bg-black py-3 text-center font-display text-lg text-white hover:opacity-90 transition-opacity"
              >
                Add to cart
              </button>
            </div>

            {/* Accordions */}
            <div className="mt-8 space-y-3">
              {accordionRows.map((title) => (
                <div key={title} className="border-t border-black/15 py-3">
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between font-display text-lg font-bold text-anna-foreground list-none [&::-webkit-details-marker]:hidden">
                      <span>{title}</span>
                      <span className="transition-transform group-open:rotate-180">⌄</span>
                    </summary>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-[#565454]">
                      {title === "How to use" && "Apply a small amount to clean skin daily."}
                      {title === "Benefits" && "Nourishes deeply and restores natural radiance."}
                      {title === "Ingredients" && "100% natural organic extracts."}
                    </p>
                  </details>
                </div>
              ))}
            </div>

            {/* FAQs */}
            {product.faqs && product.faqs.length > 0 && (
              <div className="mt-8 border-t border-black/15 pt-6">
                <h3 className="font-script text-3xl text-anna-foreground mb-4">FAQ</h3>
                <div className="space-y-3">
                  {product.faqs.map((faq) => (
                    <div key={faq} className="border-b border-black/10 pb-3">
                      <p className="font-sans text-sm font-bold text-anna-foreground">{faq}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Steps Section */}
            {product.steps && product.steps.length > 0 && (
              <div className="mt-8 border-t border-black/15 pt-6">
                <h3 className="font-script text-3xl text-anna-foreground mb-3">Steps:</h3>
                <ul className="list-disc pl-5 font-sans text-sm leading-relaxed text-anna-charcoal">
                  {product.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </main>
        <MobileFooter />
      </div>
    </div>
  );
}
