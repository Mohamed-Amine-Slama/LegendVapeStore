"use client";

import { forwardRef } from "react";
import FeatureTag from "@/components/ui/FeatureTag";

interface ManifestoStripProps {
  text: string;
  background: string;
  textColor: string;
  rotate: number;
}

const ManifestoStrip = forwardRef<HTMLDivElement, ManifestoStripProps>(function ManifestoStrip(
  { text, background, textColor, rotate },
  ref,
) {
  return (
    <FeatureTag
      ref={ref}
      text={text}
      background={background}
      textColor={textColor}
      rotate={rotate}
      size="md"
      className="will-change-transform"
    />
  );
});

export default ManifestoStrip;
