"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/collections/ProductCard";
import type { Product } from "@/lib/products";

const collectionOptions = ["New Arrivals", "On Sale"] as const;
const typeOptions = ["Health mixes", "Oils", "Face packs"] as const;
const priceOptions = ["Below ₹200", "₹200 and above"] as const;



function toggleValue(values: string[], nextValue: string) {
  return values.includes(nextValue)
    ? values.filter((value) => value !== nextValue)
    : [...values, nextValue];
}

export function CollectionProductsSection({
  products,
  initialCategory,
}: {
  products: Product[];
  initialCategory: string;
}) {
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([initialCategory]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sizeOptions = useMemo(
    () =>
      Array.from(new Set(products.flatMap((product) => product.sizes))).sort(
        (left, right) => left.localeCompare(right, undefined, { numeric: true })
      ),
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCollections =
        selectedCollections.length === 0 ||
        selectedCollections.some((option) => product.collectionTags.includes(option));

      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(product.category);

      const matchesPrice =
        selectedPrices.length === 0 ||
        selectedPrices.some((option) =>
          option === "Below ₹200"
            ? product.priceValue < 200
            : product.priceValue >= 200
        );

      const matchesSize =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) => product.sizes.includes(size));

      return matchesCollections && matchesType && matchesPrice && matchesSize;
    });
  }, [products, selectedCollections, selectedPrices, selectedSizes, selectedTypes]);

  const filterCount =
    selectedCollections.length +
    selectedTypes.length +
    selectedPrices.length +
    selectedSizes.length;

  const filterGroups = [
    {
      label: "Collections",
      options: collectionOptions,
      selected: selectedCollections,
      onToggle: (option: string) =>
        setSelectedCollections((current) => toggleValue(current, option)),
    },
    {
      label: "Type",
      options: typeOptions,
      selected: selectedTypes,
      onToggle: (option: string) =>
        setSelectedTypes((current) => toggleValue(current, option)),
    },
    {
      label: "Price",
      options: priceOptions,
      selected: selectedPrices,
      onToggle: (option: string) =>
        setSelectedPrices((current) => toggleValue(current, option)),
    },
    {
      label: "Size",
      options: sizeOptions,
      selected: selectedSizes,
      onToggle: (option: string) =>
        setSelectedSizes((current) => toggleValue(current, option)),
    },
  ];

  return (
  <section className="relative mt-[40px] grid grid-cols-1 gap-[34px] lg:grid-cols-[240px_1fr]">

    {/* Mobile Filter Drawer */}
    {isFilterOpen && (
      <>
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />

        <div className="fixed left-0 top-0 z-50 h-screen w-[300px] overflow-y-auto bg-white p-6 lg:hidden">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-[24px] font-bold">
              Filters
            </h2>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-[24px]"
            >
              ✕
            </button>
          </div>

          <div className="space-y-[22px]">
            {filterGroups.map((group) => (
              <div
                key={group.label}
                className="border-t border-black/15 pt-[16px]"
              >
                <div className="flex items-center justify-between font-display text-[20px] font-bold leading-none">
                  <span>{group.label}</span>
                  <span>⌄</span>
                </div>

                <div className="mt-[14px] space-y-[10px]">
                  {group.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-[8px] font-sans text-[13px] leading-none"
                    >
                      <input
                        type="checkbox"
                        checked={group.selected.includes(option)}
                        onChange={() => group.onToggle(option)}
                        className="h-[12px] w-[12px]"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )}

    {/* Desktop Sidebar */}
    <aside className="hidden lg:block rounded-[10px] bg-white px-[28px] py-[28px]">
      <h2 className="font-display text-[24px] font-bold leading-none">
        Filter ({filterCount})
      </h2>

      <div className="mt-[22px] space-y-[22px]">
        {filterGroups.map((group) => (
          <div
            key={group.label}
            className="border-t border-black/15 pt-[16px]"
          >
            <div className="flex items-center justify-between font-display text-[20px] font-bold leading-none">
              <span>{group.label}</span>
              <span>⌄</span>
            </div>

            <div className="mt-[14px] space-y-[10px]">
              {group.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-[8px] font-sans text-[13px] leading-none"
                >
                  <input
                    type="checkbox"
                    checked={group.selected.includes(option)}
                    onChange={() => group.onToggle(option)}
                    className="h-[12px] w-[12px]"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>

    <div>

      {/* Mobile Filter Button */}
      <div className="mb-5 lg:hidden">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="rounded-md border border-black px-4 py-2 font-display text-[16px]"
        >
          Filter ({filterCount})
        </button>
      </div>

      <div className="grid grid-cols-1 gap-x-[42px] gap-y-[42px] sm:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="mt-[28px] font-sans text-[16px] leading-normal text-black/65">
          No products match the selected filters.
        </p>
      ) : null}
    </div>
  </section>
);
}
