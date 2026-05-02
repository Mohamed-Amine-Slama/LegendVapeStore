import { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface FeatureTagProps {
  text: string;
  background: string;
  textColor: string;
  rotate: number;
  className?: string;
  size?: "md" | "lg" | "xl";
}

/**
 * Big physical-sticker label — used in ManifestoStrip and FeatureSlam.
 * Hard offset shadow + slight tilt + tight Oswald.
 */
const FeatureTag = forwardRef<HTMLDivElement, FeatureTagProps>(function FeatureTag(
  { text, background, textColor, rotate, className, size = "lg" },
  ref,
) {
  const fontSize =
    size === "md"
      ? "clamp(24px, 3.6vw, 44px)"
      : size === "xl"
      ? "clamp(40px, 6.5vw, 90px)"
      : "clamp(32px, 5vw, 64px)";

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-block w-fit font-oswald font-bold uppercase",
        "sticker-shadow-lg gloss-overlay",
        className,
      )}
      style={{
        background,
        color: textColor,
        fontSize,
        padding: "0.25em 0.7em",
        lineHeight: 0.95,
        letterSpacing: "0.01em",
        transform: `rotate(${rotate}deg)`,
        borderRadius: 6,
      }}
    >
      {text}
    </div>
  );
});

export default FeatureTag;
