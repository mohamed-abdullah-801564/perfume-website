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
              href="https://wa.me/919385303504"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 font-display text-sm font-bold text-white shadow-md hover:bg-[#20ba5a] transition-colors w-fit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 fill-current shrink-0"
              >
                <path d="M12.031 2a9.967 9.967 0 0 0-9.953 9.953c0 2.215.727 4.262 1.961 5.922L2.006 22l4.297-1.127a9.92 9.92 0 0 0 5.728 1.777c5.492 0 9.961-4.47 9.961-9.96A9.97 9.97 0 0 0 12.03 2zm4.992 13.064c-.207.582-1.191 1.077-1.637 1.137-.441.06-1 .11-2.906-.633-2.434-.949-3.993-3.414-4.113-3.574-.121-.16-1.008-1.328-1.008-2.531s.625-1.797.852-2.043c.226-.246.492-.308.656-.308.164 0 .328.008.473.016.152.008.355-.063.555.418.207.496.71 1.715.773 1.84.063.125.105.27.02.438-.083.168-.125.27-.25.418-.125.148-.262.332-.375.445-.125.125-.254.262-.109.512.145.246.645 1.059 1.383 1.715.953.848 1.758 1.113 2.012 1.238.254.125.402.106.55-.066.149-.176.645-.746.817-.996.172-.254.344-.211.582-.125.242.086 1.528.72 1.793.852.266.129.438.195.504.309.066.113.066.656-.14 1.238z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}