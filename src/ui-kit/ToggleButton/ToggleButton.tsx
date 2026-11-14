"use client";

import {
  Button as MantineButton,
  type ButtonProps as MantineButtonProps,
  type ElementProps,
} from "@mantine/core";
import { Text } from "../Text/Text";

export interface ToggleButtonProps
  extends Omit<MantineButtonProps, "variant" | "rightSection">,
    ElementProps<"button", keyof MantineButtonProps> {
  active?: boolean;
  /** Счётчик справа от подписи */
  count?: React.ReactNode;
}

/** Кнопка-переключатель для фильтров с множественным выбором. */
export function ToggleButton({
  active = false,
  count,
  ...props
}: ToggleButtonProps) {
  return (
    <MantineButton
      variant={active ? "toggle-active" : "toggle"}
      size="md"
      fw={400}
      aria-pressed={active}
      rightSection={
        count !== undefined && (
          <Text span tone="muted" fz="sm" fw={400}>
            {count}
          </Text>
        )
      }
      {...props}
    />
  );
}
