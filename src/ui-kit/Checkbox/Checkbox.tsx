"use client";

import { Checkbox as MantineCheckbox, type CheckboxProps } from "@mantine/core";

export type { CheckboxProps };

export function Checkbox(props: CheckboxProps) {
  return <MantineCheckbox size="md" radius="xs" {...props} />;
}
