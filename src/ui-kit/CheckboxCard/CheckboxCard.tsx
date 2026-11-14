"use client";

import {
  Checkbox as MantineCheckbox,
  Group,
  type CheckboxCardProps,
} from "@mantine/core";

export type { CheckboxCardProps };

/** Строка-чекбокс: индикатор + произвольное содержимое (подпись, счётчик). */
export function CheckboxCard({
  children,
  disabled,
  ...props
}: CheckboxCardProps) {
  return (
    <MantineCheckbox.Card
      withBorder={false}
      disabled={disabled}
      opacity={disabled ? 0.4 : undefined}
      py="xs"
      {...props}
    >
      <Group gap="sm" wrap="nowrap">
        <MantineCheckbox.Indicator size="md" radius="xs" />
        {children}
      </Group>
    </MantineCheckbox.Card>
  );
}
