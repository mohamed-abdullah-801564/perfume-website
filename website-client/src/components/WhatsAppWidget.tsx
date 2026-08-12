"use client";

import React from "react";
import { usePathname } from "next/navigation";

export function WhatsAppWidget() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }
  return (
    <a
      href="https://wa.me/919385303504"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:bg-[#20ba5a] hover:scale-110 hover:shadow-[0_6px_16px_rgba(0,0,0,0.35)] transition-all duration-300 active:scale-95"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8 fill-current"
      >
        <path d="M12.031 2a9.967 9.967 0 0 0-9.953 9.953c0 2.215.727 4.262 1.961 5.922L2.006 22l4.297-1.127a9.92 9.92 0 0 0 5.728 1.777c5.492 0 9.961-4.47 9.961-9.96A9.97 9.97 0 0 0 12.03 2zm4.992 13.064c-.207.582-1.191 1.077-1.637 1.137-.441.06-1 .11-2.906-.633-2.434-.949-3.993-3.414-4.113-3.574-.121-.16-1.008-1.328-1.008-2.531s.625-1.797.852-2.043c.226-.246.492-.308.656-.308.164 0 .328.008.473.016.152.008.355-.063.555.418.207.496.71 1.715.773 1.84.063.125.105.27.02.438-.083.168-.125.27-.25.418-.125.148-.262.332-.375.445-.125.125-.254.262-.109.512.145.246.645 1.059 1.383 1.715.953.848 1.758 1.113 2.012 1.238.254.125.402.106.55-.066.149-.176.645-.746.817-.996.172-.254.344-.211.582-.125.242.086 1.528.72 1.793.852.266.129.438.195.504.309.066.113.066.656-.14 1.238z" />
      </svg>
    </a>
  );
}
