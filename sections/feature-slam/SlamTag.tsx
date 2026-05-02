"use client";

import { forwardRef } from "react";
import FeatureTag from "@/components/ui/FeatureTag";

interface SlamTagProps {
  text: string;
  background: string;
  textColor: string;
  rotate: number;
}

const SlamTag = forwardRef<HTMLDivElement, SlamTagProps>(function SlamTag(props, ref) {
  return <FeatureTag ref={ref} {...props} size="lg" className="will-change-transform" />;
});

export default SlamTag;
