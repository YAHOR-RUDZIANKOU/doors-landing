"use client";

import { NativeSelect as MantineNativeSelect, type NativeSelectProps } from "@mantine/core";

export type { NativeSelectProps };

export function NativeSelect(props: NativeSelectProps) {
  return <MantineNativeSelect size="lg" {...props} />;
}
