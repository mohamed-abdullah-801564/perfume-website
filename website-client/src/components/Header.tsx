"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, accountLinks } from "@/lib/navigation";
import { collections } from "@/lib/products";
import { useSupabase } from "@/lib/supabase";
import { SearchModal } from "@/components/SearchModal";
import {
  SignInButton,
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
  const [cartCount, setCartCount] = useState(0);
  const { user, isSignedIn } = useUser();
  const { getClient } = useSupabase();

  const desktopLinkClass =
    "relative font-display text-[32px] leading-none text-anna-foreground after:absolute after:left-0 after:top-full after:mt-[6px] after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-anna-copper-mid after:transition-transform after:duration-200 hover:after:scale-x-100";

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCollectionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!user) {
      setCartCount(0);
      return;
    }

    let isMounted = true;
    let activeChannel: any = null;
    let activeClient: any = null;

    const fetchCartCount = async () => {
      try {
        const client = await getClient();
        if (!isMounted) return;
        const { data, error } = await client
          .from("cart_items")
          .select("quantity")
          .eq("user_id", user.id);

        if (!error && data && isMounted) {
          const totalQty = data.reduce((sum, item) => sum + (item.quantity || 0), 0);
          setCartCount(totalQty);
        }
      } catch (err) {
        console.error("Error fetching cart count:", err);
      }
    };

    fetchCartCount();

    // Poll every 3 seconds to keep cart in sync
    const interval = setInterval(fetchCartCount, 3000);

    // Custom event listener for instant updates
    const handleCartUpdate = () => {
      if (isMounted) {
        fetchCartCount();
      }
    };
    window.addEventListener("cart-updated", handleCartUpdate);

    // Subscribe to changes on cart_items table
    const setupSubscription = async () => {
      try {
        const supabaseClient = await getClient();
        if (!isMounted) return;
        
        const ch = supabaseClient.channel(`schema-db-changes-header-${user.id}`);
        ch.on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "cart_items",
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            if (isMounted) {
              fetchCartCount();
            }
          }
        );
        ch.subscribe();

        if (!isMounted) {
          supabaseClient.removeChannel(ch);
        } else {
          activeChannel = ch;
          activeClient = supabaseClient;
        }
      } catch (err) {
        console.error("Subscription setup failed:", err);
      }
    };

    setupSubscription();

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener("cart-updated", handleCartUpdate);
      if (activeChannel && activeClient) {
        activeClient.removeChannel(activeChannel);
      }
    };
  }, [user, getClient]);

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
          className="absolute left-1/2 top-[2px] -translate-x-1/2 xl:hidden flex items-center justify-center bg-transparent mb-4 md:mb-6"
        >
          <div className="relative h-[110px] w-[110px] bg-transparent">
            <Image
              src="/client-logo.png"
              alt="Anna Valam Logo"
              fill
              sizes="(max-width: 768px) 110px, 120px"
              className="object-contain rounded-full mix-blend-multiply bg-transparent"
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
            className="relative h-9 w-9 shrink-0 xl:h-[55px] xl:w-[55px] flex items-center justify-center"
            aria-label="Shopping bag"
          >
            <Image
              src="/images/icon-bag.png"
              alt=""
              width={55}
              height={55}
              className="object-contain brightness-0"
            />
            {cartCount > 0 && (
              <span className="bg-anna-copper text-white text-[11px] font-bold rounded-full h-5 min-w-5 px-1 flex items-center justify-center absolute -top-1.5 -right-1.5">
                {cartCount}
              </span>
            )}
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
          {accountLinks.map((link) => {
            if (link.href === "/login") {
              return isSignedIn ? (
                <div
                  key="user-button-mobile"
                  className="flex items-center justify-center rounded-md bg-anna-cream px-3 py-1.5 min-h-[44px]"
                >
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "h-8 w-8",
                      },
                    }}
                  />
                </div>
              ) : (
                <SignInButton mode="modal" key={link.label}>
                  <button className="rounded-md bg-anna-cream px-3 py-2 text-center font-display text-lg leading-tight w-full min-h-[44px] hover:bg-anna-cream/80 transition-colors">
                    Log In
                  </button>
                </SignInButton>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-md bg-anna-cream px-3 py-2 text-center font-display text-lg leading-tight flex items-center justify-center min-h-[44px] hover:bg-anna-cream/80 transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Search Modal Overlay */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}