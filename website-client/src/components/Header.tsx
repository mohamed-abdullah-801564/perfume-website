"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { navLinks, accountLinks } from "@/lib/navigation";
import { collections, products } from "@/lib/products";
import {
  SignInButton,
  SignUpButton,
  useUser,
  useClerk,
  UserButton
} from "@clerk/nextjs";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const isCollectionsPage = pathname.startsWith("/collections");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) {
      setSearchQuery("");
    }
  }, [isSearchOpen]);
  const { signOut } = useClerk();
  const { user, isSignedIn } = useUser();

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
                    className={`absolute left-0 top-full pt-6 transition-all duration-200 ${isCollectionsOpen && !isCollectionsPage
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

        {/* Mobile Hamburger button on far left */}
        <button
          type="button"
          className="absolute left-[18px] top-1/2 -translate-y-1/2 flex h-9 w-9 flex-col items-center justify-center gap-1.5 text-anna-brand xl:hidden sm:left-[51px]"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span
            className={`h-0.5 w-6 bg-anna-brand transition-transform ${isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
          />
          <span
            className={`h-0.5 w-6 bg-anna-brand transition-opacity ${isMenuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`h-0.5 w-6 bg-anna-brand transition-transform ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
          />
        </button>

        <Link
          href="/"
          className="absolute left-[18px] top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[27px] leading-none text-anna-brand xl:left-1/2 xl:-translate-x-1/2 xl:text-[48px] hidden xl:block"
        >
          ANNA VALAM
        </Link>

        <Link
          href="/"
          className="absolute left-1/2 top-[2px] -translate-x-1/2 xl:hidden flex items-center justify-center"
        >
          <div className="relative h-[110px] w-[110px]">
            <Image
              src="/client-logo.jpeg"
              alt="Anna Valam Logo"
              fill
              sizes="(max-width: 768px) 110px, 120px"
              className="object-contain rounded-full"
              priority
            />
          </div>
        </Link>

        <div className="absolute right-[18px] top-1/2 flex -translate-y-1/2 items-center gap-2 sm:right-[51px] xl:gap-[18px]">
          <nav
            className="hidden items-center gap-[18px] xl:flex"
            aria-label="Account"
          >
            {accountLinks.map((link) => {
              if (link.href === "/login") {
                return isSignedIn ? (
                  <div
                    key="user-button"
                    className="flex items-center"
                  >
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "h-10 w-10",
                        },
                      }}
                    />
                  </div>
                ) : (
                  <SignInButton mode="modal" key={link.label}>
                    <button className={desktopLinkClass}>
                      {link.label}
                    </button>
                  </SignInButton>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={desktopLinkClass}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          {/* Search Icon button - visible on both mobile & desktop */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center text-anna-brand xl:h-[55px] xl:w-[55px] hover:scale-105 transition-transform"
            aria-label="Search"
            onClick={() => setIsSearchOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-6 w-6 xl:h-[35px] xl:w-[35px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
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
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`absolute left-0 top-16 w-full border-y border-anna-brand/20 bg-anna-background/95 px-[18px] py-5 shadow-lg backdrop-blur-sm transition-all duration-200 sm:px-[51px] xl:hidden ${isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
          }`}
      >
        <nav className="flex flex-col" aria-label="Mobile primary navigation">
          {[{ label: "Home", href: "/" }, ...navLinks].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`border-b border-anna-brand/15 py-3 font-display text-2xl leading-none ${pathname === link.href
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
      {/* Search Modal Overlay */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs px-4"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border-2 border-anna-brand bg-[#FFF7E8] p-6 shadow-2xl text-anna-brand relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header of Modal */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-anna-brand/10">
              <h3 className="font-display text-xl font-bold text-anna-brand">Search Products</h3>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-anna-brand hover:text-anna-copper p-1.5 transition-colors"
                aria-label="Close search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Input Field */}
            <div className="relative mb-5">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-anna-brand/60 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Type to search e.g. Oils, Rosemary..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-anna-brand/20 bg-white pl-10 pr-4 py-3 font-sans text-base text-anna-brand focus:border-anna-copper focus:outline-none transition-colors shadow-inner"
              />
            </div>

            {/* Results Title */}
            <p className="font-display text-xs font-bold text-anna-brand/70 uppercase tracking-wider mb-3">
              {searchQuery.trim() === "" ? "Quick Results / Suggestions" : "Matching Products"}
            </p>

            {/* Results List */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {(searchQuery.trim() === ""
                ? products.slice(0, 3)
                : products.filter(
                    (p) =>
                      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
              ).length === 0 ? (
                <p className="text-center py-6 font-sans text-sm text-anna-brand/60">
                  No products found matching &quot;{searchQuery}&quot;
                </p>
              ) : (
                (searchQuery.trim() === ""
                  ? products.slice(0, 3)
                  : products.filter(
                      (p) =>
                        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.description.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                ).map((product) => (
                  <Link
                    key={product.slug}
                    href={`/product/${product.slug}`}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex gap-4 items-center rounded-lg border border-anna-brand/10 bg-white/50 p-2.5 hover:bg-white hover:border-anna-copper transition-all shadow-sm group"
                  >
                    {/* Product Thumbnail */}
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-anna-cream/30 border border-anna-brand/5 p-1">
                      <Image
                        src={product.thumbnailSrc}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow min-w-0">
                      <h4 className="font-serif text-base font-bold text-black/90 group-hover:text-anna-copper transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="font-sans text-xs text-anna-brand/80 mt-0.5 font-medium">
                        {product.category}
                      </p>
                    </div>

                    {/* Price */}
                    <span className="font-sans text-sm font-bold text-right shrink-0 text-anna-copper">
                      {product.price}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}