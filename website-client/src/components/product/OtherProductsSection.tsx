"use client";

import { useState } from "react";
import Image from "next/image";

const products = [
  {
    name: "Multigrain health\nmix",
    price: "200 $",
    src: "/images/multigrain health mix.png",
    alt: "Multigrain health mix",
  },
  {
    name: "Karuppukavuni Kanji mix\n/ Black rice porridge mix",
    price: "200 $",
    src: "/images/karuppukavuni kanji mix black rice porridge mix.png",
    alt: "Karuppukavuni Kanji mix Black rice porridge mix",
  },
];

function OtherProductCard({ product }: { product: typeof products[0] }) {
  const [quantity, setQuantity] = useState(product.name.includes("Kanji") ? 0 : 1);

  return (
    <article className="w-[230px]">
      <div className="relative h-[310px] w-[230px] overflow-hidden rounded-[12px]">
        <Image
          src={product.src}
          alt={product.alt}
          fill
          className="object-cover"
          sizes="230px"
        />
      </div>

      <h3 className="mt-[12px] font-display text-[16px] font-normal leading-[1.2] text-anna-foreground min-h-[38px]">
        {product.name.split("\n").map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h3>

      <div className="mt-[12px] flex h-[28px] items-center justify-between">
        <span className="flex h-[28px] w-[64px] items-center justify-center rounded-[3px] bg-[#E2C39B] font-display text-[14px] font-normal leading-none text-black">
          {product.price}
        </span>
        <div className="flex items-center bg-[#9C4115] rounded-[4px] px-[8px] h-[28px] gap-[10px] text-white">
          <button
            type="button"
            className="font-sans text-[15px] font-bold hover:opacity-80 transition-opacity"
            onClick={() => setQuantity((prev) => Math.max(0, prev - 1))}
            aria-label={`Decrease ${product.alt} quantity`}
          >
            -
          </button>
          <span className="w-[12px] text-center font-sans text-[14px] font-medium">
            {quantity}
          </span>
          <button
            type="button"
            className="font-sans text-[15px] font-bold hover:opacity-80 transition-opacity"
            onClick={() => setQuantity((prev) => prev + 1)}
            aria-label={`Increase ${product.alt} quantity`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

export function OtherProductsSection() {
  return (
    <section className="px-[76px] pb-[80px] pt-[160px]">
      <h2 className="flex items-baseline text-anna-foreground">
        <span className="font-display text-[32px] font-normal leading-none">
          Other
        </span>
        <span className="ml-[8px] font-script text-[42px] font-normal leading-none">
          Products
        </span>
      </h2>

      <div className="mt-[32px] grid grid-cols-[230px_230px] gap-[40px]">
        {products.map((product) => (
          <OtherProductCard key={product.src} product={product} />
        ))}
      </div>
    </section>
  );
}
