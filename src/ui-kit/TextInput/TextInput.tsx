"use client";

import { TextInput as MantineTextInput, type TextInputProps } from "@mantine/core";

export type { TextInputProps };

export function TextInput(props: TextInputProps) {
  return <MantineTextInput size="lg" {...props} />;
}
