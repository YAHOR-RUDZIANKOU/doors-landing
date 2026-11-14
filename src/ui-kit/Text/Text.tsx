import {
  Text as MantineText,
  type ElementProps,
  type TextProps as MantineTextProps,
} from "@mantine/core";
import { textTones, type TextTone } from "../theme";

export interface TextProps
  extends Omit<MantineTextProps, "c" | "color">,
    ElementProps<"p", keyof MantineTextProps> {
  tone?: TextTone;
}

export function Text({ tone = "default", ...props }: TextProps) {
  return <MantineText c={textTones[tone]} {...props} />;
}
