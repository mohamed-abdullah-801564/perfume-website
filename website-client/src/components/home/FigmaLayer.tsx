import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

type FigmaLayerProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  zIndex?: number;
};

/** Positions a child exactly as on the 1440px Figma home frame (absolute within section). */
export function FigmaLayer({
  x,
  y,
  width,
  height,
  className = "",
  style,
  children,
  zIndex,
}: FigmaLayerProps) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        zIndex,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

type FigmaImageProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  alt: string;
  className?: string;
  objectFit?: "cover" | "contain" | "fill";
  priority?: boolean;
  zIndex?: number;
  borderRadius?: number;
  style?: CSSProperties;
};

export function FigmaImage({
  x,
  y,
  width,
  height,
  src,
  alt,
  className = "",
  objectFit = "cover",
  priority = false,
  zIndex,
  borderRadius,
  style,
}: FigmaImageProps) {
  return (
    <FigmaLayer
      x={x}
      y={y}
      width={width}
      height={height}
      className={`overflow-hidden ${className}`}
      zIndex={zIndex}
      style={{
        ...(borderRadius ? { borderRadius } : {}),
        ...style,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={
          objectFit === "contain"
            ? "object-contain"
            : objectFit === "fill"
              ? "object-fill"
              : "object-cover"
        }
        priority={priority}
        sizes={`${Math.round(width)}px`}
      />
    </FigmaLayer>
  );
}
