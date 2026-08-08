import Image from "next/image";
import Link from "next/link";
import { FigmaImage } from "./FigmaLayer";
import { footerNavPrimary, footerNavSecondary } from "@/lib/navigation";


/**
 * Footer block — Figma from y=3551 (Vector 3 wave through y=4028)
 * Wave: 84:117 at -36,3551.31 — 1594×525.61 #144232
 */
export function FooterSection({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <footer
      className={`absolute left-0 top-[3551px] z-30 w-full overflow-hidden hidden xl:block ${className || ""}`}
      style={{ height: 477, ...style }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Vector 3 — curved brand-green wave */}
      <div
        className="pointer-events-none absolute -left-[36px] top-0 z-0"
        style={{ width: 1594, height: 525.61 }}
        aria-hidden
      >
        <Image
          src="/images/footer-wave.svg"
          alt=""
          fill
          className="object-fill object-top"
          sizes="1594px"
        />
      </div>

      {/* image 30 soft glow — 338,3309 (758px above footer top; rendered from page root in ritual — duplicated here for footer stack) */}
      <div
        className="hidden"
        style={{ top: -242, width: 736, height: 326 }}
        aria-hidden
      >
        <div className="relative h-full w-full blur-[71px]">
          <Image
            src="/images/hero-product.png"
            alt=""
            fill
            className="object-cover opacity-40"
            sizes="736px"
          />
        </div>
      </div>



      <div className="pointer-events-none absolute -left-[70px] top-[78px] z-[2] h-[190px] w-[540px] opacity-75">
        <Image
          src="/brand-images/image 31.png"
          alt=""
          fill
          className="object-contain"
          sizes="540px"
        />
      </div>

      <div className="pointer-events-none absolute left-[972px] top-[102px] z-[2] h-[190px] w-[540px] opacity-75">
        <Image
          src="/brand-images/image 32.png"
          alt=""
          fill
          className="object-contain"
          sizes="540px"
        />
      </div>

      {/* ANNA VALAM watermark — -17,3818 1466×342 Abhaya 700 250px rgba white 0.7 */}
      <p
        className="text-logo-hero pointer-events-none absolute -bottom-[60px] -left-[17px] z-[3] select-none"
        style={{ width: 1466, height: 342 }}
        aria-hidden
      >
        ANNA VALAM
      </p>

      {/* Frame 6 — 378,3649 col width 150 */}
      <nav
        className="absolute left-[378px] top-[98px] z-20 flex w-[150px] flex-col"
        aria-label="Footer navigation"
      >
        {footerNavPrimary.map((item) => (
          <Link key={item.label} href={item.href} className="text-footer-link">
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Frame 7 — 566,3649 */}
      <nav
        className="absolute left-[566px] top-[98px] z-20 flex w-[150px] flex-col"
        aria-label="Footer secondary navigation"
      >
        {footerNavSecondary.map((item) => (
          <Link key={item.label} href={item.href} className="text-footer-link">
            {item.label}
          </Link>
        ))}
      </nav>

      {/* +91 — 904,3738 */}
      <a
        href="tel:+919000000095"
        className="text-footer-link absolute left-[904px] top-[187px] z-20"
        style={{ width: 220, height: 38 }}
      >
        +91 9xxxxxx95
      </a>

      {/* WhatsApp chat link — 909,3776 */}
      <a
        href="https://wa.me/919385303504"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute left-[909px] top-[225px] z-20 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-display text-sm font-bold text-white shadow-md hover:bg-[#20ba5a] transition-colors"
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

    </footer>
  );
}
