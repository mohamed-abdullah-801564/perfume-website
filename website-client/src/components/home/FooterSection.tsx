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
      className={`absolute left-0 top-[3551px] z-30 w-full overflow-hidden ${className || ""}`}
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

      {/* support@ — 909,3776 */}
      <a
        href="mailto:support@annavalam.com"
        className="text-footer-link absolute left-[909px] top-[225px] z-20"
        style={{ width: 365, height: 38 }}
      >
        support@annavalam.com
      </a>

    </footer>
  );
}
