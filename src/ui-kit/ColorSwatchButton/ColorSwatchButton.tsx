"use client";

import { ColorSwatch, type ElementProps } from "@mantine/core";

export interface ColorSwatchButtonProps
  extends ElementProps<"button", "color"> {
  color: string;
  size?: number;
  selected?: boolean;
  withBorder?: boolean;
}

/** Круглая кнопка выбора цвета. */
export function ColorSwatchButton({
  color,
  size = 26,
  selected = false,
  withBorder = false,
  disabled,
  ...props
}: ColorSwatchButtonProps) {
  return (
    <ColorSwatch
      component="button"
      type="button"
      color={color}
      size={size}
      withShadow={false}
      p={0}
      bd={withBorder ? "2px solid ink.3" : undefined}
      opacity={disabled ? 0.5 : undefined}
      disabled={disabled}
      aria-pressed={selected}
      style={{
        flexShrink: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        outline: selected ? "2px solid var(--mantine-color-brand-8)" : undefined,
        outlineOffset: 2,
      }}
      {...props}
    />
  );
}
