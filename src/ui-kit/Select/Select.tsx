"use client";

import { Select as MantineSelect, type SelectProps } from "@mantine/core";

export type { SelectProps };

export function Select(props: SelectProps) {
  return <MantineSelect size="lg" {...props} />;
}
