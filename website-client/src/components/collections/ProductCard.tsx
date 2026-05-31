import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="w-full max-w-[260px]">
      <Link
        href={`/product/${product.slug}`}
        className="group block overflow-hidden rounded-[10px] bg-anna-cream"
      >
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={product.detailSrc}
            alt={product.detailAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="260px"
          />
        </div>
      </Link>
      <h3 className="mt-[10px] min-h-[38px] font-display text-[20px] leading-[1.05]">
        {product.name}
      </h3>
      <div className="mt-[8px] flex items-center justify-between">
        <span className="rounded-[3px] bg-anna-gold-light px-[10px] py-[5px] font-display text-[14px] leading-none">
          {product.price}
        </span>
        <Link
          href="/cart"
          className="flex h-[24px] w-[24px] items-center justify-center rounded-[3px] bg-anna-copper-mid"
          aria-label={`Add ${product.name} to cart`}
        >
          <Image
            src="/images/icon-bag.png"
            alt=""
            width={18}
            height={18}
            className="invert"
          />
        </Link>
      </div>
    </article>
  );
}
