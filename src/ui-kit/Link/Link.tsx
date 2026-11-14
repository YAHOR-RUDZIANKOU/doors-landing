"use client";

import NextLink from "next/link";
import { Anchor, type AnchorProps } from "@mantine/core";
import { textTones, type TextTone } from "../theme";

export type LinkProps = Omit<AnchorProps, "c"> &
  Omit<React.ComponentProps<typeof NextLink>, keyof AnchorProps> & {
    /** Без tone ссылка наследует цвет окружающего текста */
    tone?: TextTone;
  };

/** Ссылка с клиентской навигацией Next.js. */
export function Link({ tone, ...props }: LinkProps) {
  return (
    <Anchor
      component={NextLink}
      c={tone ? textTones[tone] : "inherit"}
      underline="never"
      {...props}
    />
  );
}
