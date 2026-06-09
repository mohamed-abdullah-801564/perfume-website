import Image from "next/image";
import Link from "next/link";
import { FigmaLayer } from "./FigmaLayer";

type PromoChipProps = {
  x: number;
  y: number;
  imagePosition?: "left" | "right";
  href?: string;
};

/** Group 8/9/10 product chip — 179×87px per Figma */
export function PromoChip({
  x,
  y,
  imagePosition = "right",
  href = "/product/multigrain-health-mix",
}: PromoChipProps) {
  const imageBox =
    imagePosition === "right"
      ? { left: 87, top: 8, width: 82, height: 72 }
      : { left: 10, top: 8, width: 82, height: 72 };

  const dotLarge =
    imagePosition === "right"
      ? { left: 17, top: 28, size: 28 }
      : { left: 134, top: 28, size: 28 };

  const dotSmall =
    imagePosition === "right"
      ? { left: 25, top: 36, size: 12 }
      : { left: 142, top: 36, size: 12 };

  return (
    <FigmaLayer x={x} y={y} width={179} height={87} zIndex={24}>
      <Link
        href={href}
        aria-label="View Multigrain Health Mix"
        className="relative block h-full w-full overflow-hidden rounded-badge border border-black/35 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:-translate-y-1"
      >
        <div
          className="absolute overflow-hidden rounded-[18px]"
          style={{
            left: imageBox.left,
            top: imageBox.top,
            width: imageBox.width,
            height: imageBox.height,
          }}
        >
          <Image
            src="/images/card-product.png"
            alt="Anna Valam product"
            fill
            className="object-cover"
            sizes="82px"
          />
        </div>
        <span
          className="absolute rounded-full bg-[rgba(36,225,52,0.76)]"
          style={{
            left: dotLarge.left,
            top: dotLarge.top,
            width: dotLarge.size,
            height: dotLarge.size,
          }}
          aria-hidden
        />
        <span
          className="absolute rounded-full bg-[#1B9E52]"
          style={{
            left: dotSmall.left,
            top: dotSmall.top,
            width: dotSmall.size,
            height: dotSmall.size,
          }}
          aria-hidden
        />
      </Link>
    </FigmaLayer>
  );
}
