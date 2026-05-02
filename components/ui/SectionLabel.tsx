import { cn } from "@/lib/cn";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "font-ui text-[11px] font-medium uppercase tracking-[0.22em] opacity-60",
        className,
      )}
    >
      {children}
    </span>
  );
}
