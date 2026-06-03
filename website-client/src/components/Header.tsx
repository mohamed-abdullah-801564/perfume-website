"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, accountLinks } from "@/lib/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="absolute left-0 top-0 z-50 h-[82px] w-full">
      <div className="relative mx-auto h-full w-full max-w-site px-[18px] sm:px-[51px]">
        <nav
          className="absolute left-[18px] top-1/2 flex -translate-y-1/2 items-center gap-[28px] sm:left-[51px]"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={
                  isActive
                    ? "font-display text-[32px] leading-none text-anna-foreground underline underline-offset-4"
                    : "font-display text-[32px] leading-none text-anna-foreground hover:opacity-80"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[48px] leading-none text-anna-brand"
        >
          ANNA VALAM
        </Link>

        <div className="absolute right-[18px] top-1/2 flex -translate-y-1/2 items-center gap-[18px] sm:right-[51px]">
          <nav
            className="flex items-center gap-[18px]"
            aria-label="Account"
          >
            {accountLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-display text-[32px] leading-none text-anna-foreground hover:opacity-80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/cart"
            className="relative h-[55px] w-[55px] shrink-0"
            aria-label="Shopping bag"
          >
            <Image
              src="/images/icon-bag.png"
              alt=""
              width={55}
              height={55}
              className="object-contain"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
