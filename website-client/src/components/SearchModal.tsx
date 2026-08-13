"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Small timeout to ensure input renders before focusing
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timer);
      };
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border-2 border-anna-brand bg-[#FFF7E8] p-6 shadow-2xl text-anna-brand relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header of Modal */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-anna-brand/10">
          <h3 className="font-display text-xl font-bold text-anna-brand">Search Products</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-anna-brand hover:text-anna-copper p-1.5 transition-colors"
            aria-label="Close search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Input Field */}
        <div className="relative mb-5">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-anna-brand/60 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type to search e.g. Oils, Rosemary..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-anna-brand/20 bg-white pl-10 pr-4 py-3 font-sans text-base text-anna-brand focus:border-anna-copper focus:outline-none transition-colors shadow-inner"
          />
        </div>

        {/* Dynamic content depending on empty query vs search query */}
        {searchQuery.trim() === "" ? (
          <div>
            <p className="font-display text-xs font-bold text-anna-brand/70 uppercase tracking-wider mb-3">
              Categories
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/collections/health-mix"
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-lg border border-anna-brand/10 bg-white hover:border-anna-copper hover:bg-anna-cream/20 transition-all font-display text-base font-bold text-anna-brand group"
              >
                <span>Health Mixes</span>
                <span className="text-anna-brand/60 group-hover:text-anna-copper transition-colors">
                  →
                </span>
              </Link>
              <Link
                href="/collections/oils"
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-lg border border-anna-brand/10 bg-white hover:border-anna-copper hover:bg-anna-cream/20 transition-all font-display text-base font-bold text-anna-brand group"
              >
                <span>Oils</span>
                <span className="text-anna-brand/60 group-hover:text-anna-copper transition-colors">
                  →
                </span>
              </Link>
              <Link
                href="/collections/face-packs"
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-lg border border-anna-brand/10 bg-white hover:border-anna-copper hover:bg-anna-cream/20 transition-all font-display text-base font-bold text-anna-brand group"
              >
                <span>Face Packs</span>
                <span className="text-anna-brand/60 group-hover:text-anna-copper transition-colors">
                  →
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p className="font-display text-xs font-bold text-anna-brand/70 uppercase tracking-wider mb-3">
              Matching Products
            </p>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {filteredProducts.length === 0 ? (
                <p className="text-center py-6 font-sans text-sm text-anna-brand/60">
                  No products found matching &quot;{searchQuery}&quot;
                </p>
              ) : (
                filteredProducts.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-3 rounded-lg border border-anna-brand/10 bg-white hover:border-anna-copper hover:bg-anna-cream/20 transition-all font-display text-base font-bold text-anna-brand group"
                  >
                    <span>{product.name}</span>
                    <span className="text-anna-brand/60 group-hover:text-anna-copper transition-colors">
                      →
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
