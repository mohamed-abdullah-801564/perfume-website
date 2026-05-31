"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FigmaImage } from "./FigmaLayer";
import { FigmaLayer } from "./FigmaLayer";
import { categoryOrder, getFirstProductByCategory, products } from "@/lib/products";

const productSlots = [
  {
    bg: { x: 98, y: 850, w: 205, h: 182 },
    image: { x: 114, y: 872, w: 174, h: 148 },
    src: "/images/product-1-2b9d79.png",
    alt: "Health mix product",
    href: "/product/multigrain-health-mix",
  },
  {
    bg: { x: 428, y: 850, w: 205, h: 182 },
    image: { x: 438, y: 872, w: 186, h: 152 },
    src: "/images/product-2-68e613.png",
    alt: "Oil product",
    href: "/product/rosemary-oil",
  },
  {
    bg: { x: 758, y: 850, w: 205, h: 182 },
    image: { x: 795, y: 872, w: 132, h: 137 },
    src: "/images/product-3.png",
    alt: "Face pack product",
    href: "/product/glowing-face-pack",
  },
  {
    bg: { x: 1088, y: 850, w: 205, h: 182 },
    image: { x: 1081, y: 872, w: 219, h: 159 },
    src: "/images/product-4-784bf1.png",
    alt: "Wellness product",
    href: "/product/black-rice-porridge-mix",
  },
];

export function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("Oils");
  const featuredProduct = getFirstProductByCategory(activeCategory) ?? products[0];

  return (
    <>
      {/* Our products — 51,1092 357×76 */}
      <h2
        id="products-heading"
        className="text-heading-section absolute left-[51px] top-[1092px] z-10 w-[357px]"
        style={{ height: 76 }}
      >
        Our products
      </h2>

      {/* All products — 1162,1237 */}
      <Link
        href="/collections"
        className="text-nav-active absolute left-[1162px] top-[1237px] z-10"
        style={{ width: 160, height: 38 }}
      >
        All products
      </Link>

      <FigmaLayer x={390} y={1217} width={660} height={58} zIndex={20}>
        <div className="flex h-full w-full items-center gap-[15px]">
          {categoryOrder.map((category) => {
            const isActive = category === activeCategory;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`flex h-[58px] w-[210px] items-center justify-center rounded-card font-display text-anna-title-sm leading-none transition-colors ${
                  isActive
                    ? "bg-anna-copper-mid text-white"
                    : "bg-anna-cream text-anna-foreground"
                }`}
                aria-pressed={isActive}
              >
                {category}
              </button>
            );
          })}
        </div>
      </FigmaLayer>

      {/* Product grid — cream plates + images */}
      {productSlots.map((slot) => (
        <Link key={slot.src} href={slot.href} aria-label={`View ${slot.alt}`}>
          <FigmaLayer
            x={slot.bg.x}
            y={slot.bg.y}
            width={slot.bg.w}
            height={slot.bg.h}
            zIndex={10}
          >
            <div className="h-full w-full rounded-product bg-anna-cream" />
          </FigmaLayer>
          <FigmaImage
            x={slot.image.x}
            y={slot.image.y}
            width={slot.image.w}
            height={slot.image.h}
            src={slot.src}
            alt={slot.alt}
            zIndex={11}
          />
        </Link>
      ))}

      {/* Group 5 Rosemary — 574,1327 291.26×511 */}
      <FigmaLayer x={574} y={1327} width={291.26} height={511} zIndex={12}>
        <Link
          href={`/product/${featuredProduct.slug}`}
          className="relative block h-full w-full overflow-hidden rounded-pill bg-anna-cream"
          aria-label={`View ${featuredProduct.name}`}
        >
          <div
            className="absolute left-0 top-0 overflow-hidden rounded-pill"
            style={{ width: 291.26, height: 415.23 }}
          >
            <Image
              src={featuredProduct.featuredSrc}
              alt={featuredProduct.detailAlt}
              fill
              className={
                featuredProduct.category === "Oils"
                  ? "object-cover"
                  : "object-contain p-[24px]"
              }
              sizes="291px"
            />
          </div>
          <p
            className="text-product-title absolute left-[22px] top-[427px] w-[247px] text-center"
            style={{ height: 42 }}
          >
            {featuredProduct.shortName}
          </p>
          <p
            className="text-product-title absolute left-[22px] top-[469px] w-[247px] text-center"
            style={{ height: 42 }}
          >
            {featuredProduct.price}
          </p>
        </Link>
      </FigmaLayer>
    </>
  );
}
