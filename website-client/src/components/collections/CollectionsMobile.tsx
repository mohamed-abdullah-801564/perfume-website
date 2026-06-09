"use client";

import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/products";
import { footerNavPrimary, footerNavSecondary } from "@/lib/navigation";

export function CollectionsMobile() {
  return (
    <main className="bg-anna-background pt-16 text-anna-foreground xl:hidden">
      <section className="px-4 py-6">
        <h1 className="flex flex-wrap items-baseline gap-2">
          <span className="font-display text-[36px] leading-none">
            All
          </span>

          <span className="font-script text-[36px] leading-none">
            Collections
          </span>
        </h1>

        <section className="mt-10 grid grid-cols-1 gap-5">
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
                className="object-cover"
                sizes="100vw"
              />

              <span className="absolute left-[14px] top-[14px] rounded-[6px] border border-black/85 bg-white/10 px-[16px] py-[10px] font-display text-[24px] leading-none text-anna-foreground">
                {collection.label}
              </span>
            </Link>
          ))}
        </section>
      </section>

      {/* Same footer pattern as MobileHome */}
      <footer className="relative mt-12 overflow-hidden bg-anna-brand px-5 pb-8 pt-10 text-anna-cream">
        <p className="font-display text-3xl font-bold">
          ANNA VALAM
        </p>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <nav
            className="flex flex-col gap-2"
            aria-label="Mobile footer navigation"
          >
            {footerNavPrimary.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-display text-base underline underline-offset-4"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <nav
            className="flex flex-col gap-2"
            aria-label="Mobile footer secondary navigation"
          >
            {footerNavSecondary.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-display text-base underline underline-offset-4"
              >
                {item.label}
              </Link>
            ))}

            <a
              href="mailto:support@annavalam.com"
              className="mt-3 break-all font-display text-sm underline"
            >
              support@annavalam.com
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}