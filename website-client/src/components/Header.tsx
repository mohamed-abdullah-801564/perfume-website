"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, accountLinks } from "@/lib/navigation";
import { collections } from "@/lib/products";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const isCollectionsPage = pathname.startsWith("/collections");
  const desktopLinkClass =
    "relative font-display text-[32px] leading-none text-anna-foreground after:absolute after:left-0 after:top-full after:mt-[6px] after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-anna-copper-mid after:transition-transform after:duration-200 hover:after:scale-x-100";

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCollectionsOpen(false);
  }, [pathname]);

  return (
    <header className="absolute left-0 top-0 z-50 h-16 w-full xl:h-[82px]">
      <div className="relative mx-auto h-full w-full max-w-site px-[18px] sm:px-[51px]">
        <nav
          className="absolute left-[18px] top-1/2 hidden -translate-y-1/2 items-center gap-[28px] sm:left-[51px] xl:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            if (link.label === "Collections") {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (!isCollectionsPage) {
                      setIsCollectionsOpen(true);
                    }
                  }}
                  onMouseLeave={() => setIsCollectionsOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={
                      isActive || isCollectionsOpen
                        ? `${desktopLinkClass} after:scale-x-100`
                        : desktopLinkClass
                    }
                  >
                    {link.label}
                  </Link>

                  <div
                    className={`absolute left-0 top-full pt-6 transition-all duration-200 ${
                      isCollectionsOpen && !isCollectionsPage
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="w-[980px] rounded-[18px] border border-black/10 bg-white/95 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.14)] backdrop-blur-sm">
                      <div className="grid grid-cols-3 gap-5">
                        {collections.map((collection) => (
                          <Link
                            key={collection.slug}
                            href={`/collections/${collection.slug}`}
                            className="group block"
                          >
                            <div className="relative aspect-[1.08/1] overflow-hidden rounded-[14px] bg-anna-cream">
                              <Image
                                src={collection.cardImage}
                                alt={collection.alt}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                                sizes="300px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
                              <div className="absolute inset-x-4 bottom-4 text-white">
                                <p className="font-display text-[28px] leading-none">
                                  {collection.label}
                                </p>
                                <p className="mt-2 font-sans text-[13px] uppercase tracking-[0.14em] text-white/90">
                                  {collection.category}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className={
                  isActive
                    ? `${desktopLinkClass} after:scale-x-100`
                    : desktopLinkClass
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/"
          className="absolute left-[18px] top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[27px] leading-none text-anna-brand xl:left-1/2 xl:-translate-x-1/2 xl:text-[48px]"
        >
          ANNA VALAM
        </Link>

        <div className="absolute right-[18px] top-1/2 flex -translate-y-1/2 items-center gap-2 sm:right-[51px] xl:gap-[18px]">
          <nav
            className="hidden items-center gap-[18px] xl:flex"
            aria-label="Account"
          >
            {accountLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={desktopLinkClass}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/cart"
            className="relative h-9 w-9 shrink-0 xl:h-[55px] xl:w-[55px]"
            aria-label="Shopping bag"
          >
            <Image
              src="/images/icon-bag.png"
              alt=""
              width={55}
              height={55}
              className="object-contain brightness-0"
            />
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md border border-anna-brand/30 bg-anna-background/90 xl:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span
              className={`h-0.5 w-5 bg-anna-brand transition-transform ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-anna-brand transition-opacity ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-anna-brand transition-transform ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`absolute left-0 top-16 w-full border-y border-anna-brand/20 bg-anna-background/95 px-[18px] py-5 shadow-lg backdrop-blur-sm transition-all duration-200 sm:px-[51px] xl:hidden ${
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav className="flex flex-col" aria-label="Mobile primary navigation">
          {[{ label: "Home", href: "/" }, ...navLinks].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`border-b border-anna-brand/15 py-3 font-display text-2xl leading-none ${
                pathname === link.href
                  ? "text-anna-copper underline underline-offset-4"
                  : "text-anna-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <nav className="mt-3 grid grid-cols-2 gap-2" aria-label="Mobile account navigation">
          {accountLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-md bg-anna-cream px-3 py-2 text-center font-display text-lg leading-tight"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
