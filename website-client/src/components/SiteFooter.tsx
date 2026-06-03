import Image from "next/image";
import Link from "next/link";
import { footerNavPrimary, footerNavSecondary } from "@/lib/navigation";

export function SiteFooter({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`relative h-[477px] w-screen overflow-hidden ${className}`}
      style={{ left: "50%", transform: "translateX(-50%)" }}
      aria-labelledby="site-footer-heading"
    >
      <h2 id="site-footer-heading" className="sr-only">
        Footer
      </h2>

      <div
        className="pointer-events-none absolute top-0 z-0"
        style={{
          left: "50%",
          width: "max(1594px, 110vw)",
          height: 525.61,
          transform: "translateX(-50%)",
        }}
        aria-hidden
      >
        <Image
          src="/images/footer-wave.svg"
          alt=""
          fill
          className="object-fill object-top"
          sizes="100vw"
        />
      </div>

      <div
        className="pointer-events-none absolute top-[78px] z-[2] h-[190px] w-[540px] opacity-75"
        style={{ left: "calc(50% - 790px)" }}
      >
        <Image
          src="/brand-images/image 31.png"
          alt=""
          fill
          className="object-contain"
          sizes="540px"
        />
      </div>

      <div
        className="pointer-events-none absolute top-[102px] z-[2] h-[190px] w-[540px] opacity-75"
        style={{ left: "calc(50% + 252px)" }}
      >
        <Image
          src="/brand-images/image 32.png"
          alt=""
          fill
          className="object-contain"
          sizes="540px"
        />
      </div>

      <p
        className="text-logo-hero pointer-events-none absolute -bottom-[60px] z-[3] select-none"
        style={{ left: "calc(50% - 737px)", width: 1466, height: 342 }}
        aria-hidden
      >
        ANNA VALAM
      </p>

      <nav
        className="absolute top-[98px] z-20 flex w-[150px] flex-col"
        style={{ left: "calc(50% - 342px)" }}
        aria-label="Footer navigation"
      >
        {footerNavPrimary.map((item) => (
          <Link key={item.label} href={item.href} className="text-footer-link">
            {item.label}
          </Link>
        ))}
      </nav>

      <nav
        className="absolute top-[98px] z-20 flex w-[150px] flex-col"
        style={{ left: "calc(50% - 154px)" }}
        aria-label="Footer secondary navigation"
      >
        {footerNavSecondary.map((item) => (
          <Link key={item.label} href={item.href} className="text-footer-link">
            {item.label}
          </Link>
        ))}
      </nav>

      <a
        href="tel:+919000000095"
        className="text-footer-link absolute top-[187px] z-20"
        style={{ left: "calc(50% + 184px)", width: 220, height: 38 }}
      >
        +91 9xxxxxx95
      </a>

      <a
        href="mailto:support@annavalam.com"
        className="text-footer-link absolute top-[225px] z-20"
        style={{ left: "calc(50% + 189px)", width: 365, height: 38 }}
      >
        support@annavalam.com
      </a>
    </footer>
  );
}
