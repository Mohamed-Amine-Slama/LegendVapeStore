import { cn } from "@/lib/cn";

interface GoldTagProps {
  children: React.ReactNode;
  color?: string;
  textColor?: string;
  rotate?: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * Inline sticker tag — the distinctive mid-sentence treatment.
 * Hard offset shadow + slight rotation = stuck-on-paper feel.
 */
export default function GoldTag({
  children,
  color = "#C8A96E",
  textColor = "#1A1A1A",
  rotate = -1.5,
  size = "md",
  className,
}: GoldTagProps) {
  const fontSize =
    size === "sm"
      ? "clamp(14px, 1.6vw, 22px)"
      : size === "lg"
      ? "clamp(28px, 4vw, 56px)"
      : size === "xl"
      ? "clamp(40px, 6vw, 84px)"
      : "clamp(20px, 2.6vw, 36px)";

  const padding =
    size === "sm"
      ? "0.45em 0.9em"
      : size === "xl"
      ? "0.30em 0.55em"
      : "0.35em 0.7em";

  return (
    <span
      className={cn(
        "relative inline-block rounded-[6px] font-oswald font-bold uppercase",
        "sticker-shadow-md gloss-overlay",
        className,
      )}
      style={{
        background: color,
        color: textColor,
        transform: `rotate(${rotate}deg)`,
        fontSize,
        padding,
        lineHeight: 0.92,
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </span>
  );
}
