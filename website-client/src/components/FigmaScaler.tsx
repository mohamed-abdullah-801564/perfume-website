"use client";

import { useEffect, useRef, useState } from "react";
import { FIGMA_HOME } from "@/lib/figma-home";

/**
 * Wraps the Figma canvas and scales it proportionally to fit the viewport width.
 * No horizontal or vertical overflow — the canvas scales like a zoomed page.
 */
export function FigmaScaler({ children, customHeight }: { children: React.ReactNode, customHeight?: number }) {
  const [scale, setScale] = useState(1);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateScale() {
      const vw = window.innerWidth;
      setScale(vw / FIGMA_HOME.width);
    }
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const canonicalHeight = customHeight ?? FIGMA_HOME.height;
  const scaledHeight = canonicalHeight * scale;

  return (
    <div
      ref={outerRef}
      style={{ width: "100vw", height: scaledHeight, overflow: "hidden" }}
    >
      <div
        style={{
          width: FIGMA_HOME.width,
          height: canonicalHeight,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
