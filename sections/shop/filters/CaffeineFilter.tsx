"use client";

import ToggleSwitch from "@/components/ui/ToggleSwitch";

interface CaffeineFilterProps {
  value: boolean;
  onChange: (next: boolean) => void;
}

export default function CaffeineFilter({ value, onChange }: CaffeineFilterProps) {
  return (
    <label
      className="flex cursor-pointer items-center justify-between"
      onClick={(e) => {
        e.preventDefault();
        onChange(!value);
      }}
    >
      <span
        className="font-ui font-medium"
        style={{ fontSize: 12, color: "#1A1A1A", letterSpacing: "0.04em" }}
      >
        Caffeinated only
      </span>
      <ToggleSwitch
        checked={value}
        onChange={onChange}
        ariaLabel="Caffeinated only"
      />
    </label>
  );
}
