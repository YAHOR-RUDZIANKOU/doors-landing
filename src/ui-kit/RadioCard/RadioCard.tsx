"use client";

import { Group, Radio as MantineRadio, type RadioCardProps } from "@mantine/core";

export type { RadioCardProps };

/** Строка-радио: индикатор + произвольное содержимое, выбранная строка подсвечена. */
export function RadioCard({ children, checked, ...props }: RadioCardProps) {
  return (
    <MantineRadio.Card
      withBorder={false}
      checked={checked}
      bg={checked ? "brand.0" : undefined}
      px="sm"
      py="xs"
      {...props}
    >
      <Group gap="sm" wrap="nowrap">
        <MantineRadio.Indicator size="sm" />
        {children}
      </Group>
    </MantineRadio.Card>
  );
}
