"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ingredients = [
  {
    name: "Karuppu Kavuni Rice",
    src: "/ingredients-images/karuppu kavuni rice.png",
  },
  {
    name: "Mapillai Samba Rice",
    src: "/ingredients-images/mapillai samba rice.png",
  },
  {
    name: "Kattuyanam Rice",
    src: "/ingredients-images/kattuyam rice.png",
  },
  {
    name: "Matta Rice, Samai (Little Millet)",
    src: "/ingredients-images/matta rice.png",
  },
  {
    name: "Kollu (Horse Gram)",
    src: "/ingredients-images/kollu (horse gram).png",
  },
];

export function KeyIngredientsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, []);

  function showIngredient(index: number) {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);

    hoverTimer.current = setTimeout(() => {
      setVisible(false);
      fadeTimer.current = setTimeout(() => {
        setActiveIndex(index);
        setVisible(true);
      }, 180);
    }, 500);
  }

  const activeIngredient = ingredients[activeIndex];

  return (
    <section className="grid h-[665px] grid-cols-[585px_1fr] gap-[56px] px-[62px] pb-[58px] pt-[96px]">
      <div className="pt-[97px]">
        <h2 className="flex items-baseline text-anna-foreground">
          <span className="font-display text-[36px] font-normal leading-none">
            Key
          </span>
          <span className="font-script text-[42px] font-normal leading-none">
            Ingredients
          </span>
        </h2>

        <div className="mt-[52px] w-[565px]">
          {ingredients.map((ingredient, index) => (
            <button
              key={ingredient.name}
              type="button"
              onPointerEnter={() => showIngredient(index)}
              onMouseEnter={() => showIngredient(index)}
              onMouseOver={() => showIngredient(index)}
              onFocus={() => showIngredient(index)}
              onClick={() => showIngredient(index)}
              className="block h-[57px] w-full border-b border-black/40 text-left font-sans text-[16px] font-normal leading-none text-anna-foreground transition-colors duration-300 hover:text-anna-copper-mid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-anna-copper-mid"
            >
              {ingredient.name}
            </button>
          ))}
        </div>

        <Link
          href="/ingredients"
          className="mt-[14px] block font-sans text-[13px] font-normal leading-none text-black/35 underline decoration-black/25 underline-offset-2"
        >
          See all ingredients -&gt;
        </Link>
      </div>

      <div className="relative h-[650px] w-[672px] overflow-hidden rounded-[10px]">
        <Image
          key={activeIngredient.src}
          src={activeIngredient.src}
          alt={activeIngredient.name}
          fill
          className={`object-cover transition-all duration-700 ease-out ${
            visible ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
          }`}
          sizes="672px"
        />
      </div>
    </section>
  );
}
