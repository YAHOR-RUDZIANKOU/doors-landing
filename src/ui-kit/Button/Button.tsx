"use client";

import {
  Button as MantineButton,
  type ButtonProps as MantineButtonProps,
  type ElementProps,
} from "@mantine/core";

export type ButtonVariant =
  | "filled"
  | "primary"
  | "accent"
  | "secondary"
  | "text";

export interface ButtonProps
  extends Omit<MantineButtonProps, "variant">,
    ElementProps<"button", keyof MantineButtonProps> {
  /** filled — основное действие формы, primary — акцентная, accent — тёмно-оранжевая с белым текстом, secondary — контурная, text — как ссылка */
  variant?: ButtonVariant;
}

export function Button({ variant = "filled", ...props }: ButtonProps) {
  const textProps = variant === "text" ? { h: "auto", px: 0 } : null;

  return <MantineButton variant={variant} {...textProps} {...props} />;
}
