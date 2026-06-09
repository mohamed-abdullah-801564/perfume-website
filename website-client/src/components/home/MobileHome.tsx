"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  categoryOrder,
  getFirstProductByCategory,
  products,
} from "@/lib/products";
import { footerNavPrimary, footerNavSecondary } from "@/lib/navigation";

const productLinks = [
  {
    src: "/images/product-1-2b9d79.png",
    alt: "Health mix",
  },
  {
    src: "/images/product-2-68e613.png",
    alt: "Rosemary oil",
  },
  {
    src: "/images/product-3.png",
    alt: "Face pack",
  },
  {
    src: "/images/product-4-784bf1.png",
    alt: "Wellness mix",
  },
];

export function MobileHome() {
  const [activeCategory, setActiveCategory] = useState("Oils");
  const featuredProduct = getFirstProductByCategory(activeCategory) ?? products[0];

  return (
    <main className="mobile-home bg-anna-background pt-16 xl:hidden">
      <section className="relative min-h-[520px] overflow-hidden px-5 pb-8 pt-7">
        <Image
          src="/images/image 19.png"
          alt=""
          width={360}
          height={480}
          className="pointer-events-none absolute -left-28 top-12 h-[350px] w-[260px] object-fill opacity-90"
        />
        <Image
          src="/images/image 19.png"
          alt=""
          width={360}
          height={480}
          className="pointer-events-none absolute -right-28 top-16 h-[350px] w-[260px] -scale-x-100 object-fill opacity-90"
        />

        <p className="relative z-10 w-40 font-script text-[42px] leading-[0.95]">
          Tradition That Nourishes Beauty.
        </p>
        <p className="absolute right-5 top-56 z-10 w-36 text-right font-script text-[43px] leading-[0.95]">
          Glow the Siddha Way.
        </p>

        <div className="absolute left-1/2 top-16 z-[5] h-[330px] w-[190px] -translate-x-1/2 rotate-[8deg]">
          <Image
            src="/images/hero-product.png"
            alt="Anna Valam herbal wellness face pack"
            fill
            priority
            className="object-contain"
            sizes="190px"
          />
        </div>
        <div className="absolute bottom-0 left-1/2 z-[4] h-[205px] w-[355px] -translate-x-1/2">
          <Image
            src="/images/image 16.png"
            alt=""
            fill
            className="object-contain object-bottom"
            sizes="355px"
          />
        </div>
        <div className="absolute bottom-24 left-[18%] z-20 flex h-7 w-14 items-center rounded-lg border border-black/30 bg-white p-1">
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <div className="relative ml-auto h-5 w-6 overflow-hidden rounded">
            <Image src="/images/card-product.png" alt="" fill className="object-cover" sizes="24px" />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-3 bg-anna-brand px-4 py-3">
        {productLinks.map((product) => (
          <div
            key={product.src}
            className="relative aspect-square overflow-hidden rounded-lg bg-anna-cream p-1"
          >
            <Image src={product.src} alt={product.alt} fill className="object-contain p-1.5" sizes="22vw" />
          </div>
        ))}
      </section>

      <section className="px-4 py-8" aria-labelledby="mobile-products-heading">
        <div className="mb-5 flex items-end justify-between">
          <h2 id="mobile-products-heading" className="font-display text-[28px] font-bold leading-none">
            Our products
          </h2>
          <Link href="/collections" className="font-display text-sm underline underline-offset-4">
            All products
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {categoryOrder.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`min-h-9 rounded-md px-2 font-display text-sm transition-colors ${
                category === activeCategory
                  ? "bg-anna-copper-mid text-white"
                  : "bg-anna-cream text-black"
              }`}
              aria-pressed={category === activeCategory}
            >
              {category}
            </button>
          ))}
        </div>

        <Link
          href={`/product/${featuredProduct.slug}`}
          className="mx-auto mt-6 block w-[52%] max-w-[220px] overflow-hidden rounded-xl bg-anna-cream"
        >
          <div className="relative aspect-[3/3.7]">
            <Image
              src={featuredProduct.featuredSrc}
              alt={featuredProduct.detailAlt}
              fill
              className={featuredProduct.category === "Oils" ? "object-cover" : "object-contain p-3"}
              sizes="52vw"
            />
          </div>
          <div className="px-2 py-2 text-center font-display text-base leading-tight">
            <p>{featuredProduct.shortName}</p>
            <p>{featuredProduct.price}</p>
          </div>
        </Link>
      </section>

      <section className="px-4 pb-10" aria-labelledby="mobile-skin-heading">
        <h2 id="mobile-skin-heading" className="font-display text-[28px] font-bold leading-none">
          Why your Skin
        </h2>
        <p className="mb-5 mt-1 font-script text-[26px] leading-none">Deserves the best</p>

        <div className="grid grid-cols-2 gap-2">
          <div className="relative row-span-2 min-h-[310px] overflow-hidden rounded-lg">
            <Image
              src="/images/lifestyle-botanical.png"
              alt="Botanical skincare"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute bottom-3 left-2 right-2 rounded-md bg-white/95 p-2">
              <p className="font-display text-sm font-bold leading-none">proven</p>
              <p className="font-script text-lg leading-none">Effectiveness</p>
              <p className="mt-1 font-sans text-[7px] leading-tight">
                Every product is carefully crafted to meet the highest quality standards.
              </p>
            </div>
          </div>
          <div className="relative min-h-[150px] overflow-hidden rounded-lg">
            <Image src="/images/image 29.png" alt="Eco-friendly packaging" fill className="object-cover" sizes="50vw" />
            <p className="absolute inset-x-4 top-1/2 -translate-y-1/2 rounded bg-anna-background/90 p-2 font-sans text-[9px] leading-snug">
              Eco-friendly packaging materials designed to care for the planet as much as your skin
            </p>
          </div>
          <div className="relative min-h-[150px] overflow-hidden rounded-lg bg-anna-brand">
            <Image
              src="/images/siddha-ritual-54332e.png"
              alt="Natural Siddha ingredients"
              fill
              className="object-cover opacity-80"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-anna-brand/25" />
            <p className="absolute bottom-5 right-3 text-right font-display text-base font-bold leading-tight text-anna-cream">
              100% Natural
              <span className="block font-script text-lg font-normal">100% You</span>
            </p>
          </div>
        </div>
      </section>

      <section className="relative min-h-[500px] overflow-hidden px-5 pt-2">
        <p className="relative z-10 w-64 font-script text-[38px] leading-[1.05]">
          Nature&apos;s Wisdom, Beautifully Yours.
        </p>
        <p className="absolute bottom-16 right-5 z-10 w-44 text-right font-script text-[38px] leading-[1.05]">
          Your Daily Siddha Ritual.
        </p>
        <div className="absolute bottom-0 left-1/2 h-[430px] w-[260px] -translate-x-1/2">
          <Image
            src="/images/hero-botanical-608f3c.png"
            alt="Rosemary oil with botanicals"
            fill
            className="object-contain object-bottom"
            sizes="260px"
          />
        </div>
      </section>

      <footer className="relative overflow-hidden bg-anna-brand px-5 pb-8 pt-10 text-anna-cream">
        <p className="font-display text-3xl font-bold">ANNA VALAM</p>
        <div className="mt-6 grid grid-cols-2 gap-6">
          <nav className="flex flex-col gap-2" aria-label="Mobile footer navigation">
            {footerNavPrimary.map((item) => (
              <Link key={item.label} href={item.href} className="font-display text-base underline underline-offset-4">
                {item.label}
              </Link>
            ))}
          </nav>
          <nav className="flex flex-col gap-2" aria-label="Mobile footer secondary navigation">
            {footerNavSecondary.map((item) => (
              <Link key={item.label} href={item.href} className="font-display text-base underline underline-offset-4">
                {item.label}
              </Link>
            ))}
            <a href="mailto:support@annavalam.com" className="mt-3 break-all font-display text-sm underline">
              support@annavalam.com
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
