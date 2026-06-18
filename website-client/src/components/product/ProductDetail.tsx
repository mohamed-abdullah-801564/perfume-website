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
    <FigmaScaler customHeight={customHeight}>
      <main
        className="bg-anna-background"
        style={{
          width: FIGMA_HOME.width,
          height: customHeight,   // ← uses the variable
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
  );
}
