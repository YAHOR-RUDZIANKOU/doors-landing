"use client";

import { Box, Paper, type PaperProps } from "@mantine/core";
import { Link } from "../Link/Link";
import { zIndex } from "../theme";

export interface CardProps extends PaperProps {
  children?: React.ReactNode;
  /** filled — серая подложка, outlined — светлая с рамкой */
  variant?: "filled" | "outlined";
  /** Соотношение сторон (ширина / высота) */
  ratio?: number;
  /** Содержимое поверх карточки в левом верхнем углу (например, бейдж) */
  topLeft?: React.ReactNode;
  /** Содержимое поверх карточки в левом нижнем углу */
  bottomLeft?: React.ReactNode;
  /** Делает всю карточку ссылкой */
  href?: string;
  /** Подпись ссылки для скринридеров */
  linkLabel?: string;
}

export function Card({
  children,
  variant = "filled",
  ratio,
  topLeft,
  bottomLeft,
  href,
  linkLabel,
  ...props
}: CardProps) {
  return (
    <Paper
      pos="relative"
      p="md"
      bg={variant === "filled" ? "ink.1" : "ink.0"}
      withBorder={variant === "outlined"}
      style={{ aspectRatio: ratio, overflow: "hidden" }}
      {...props}
    >
      {children}

      {href && (
        <Link
          href={href}
          aria-label={linkLabel}
          pos="absolute"
          inset={0}
          style={{ zIndex: zIndex.cardLink }}
        />
      )}

      {topLeft && (
        <Box pos="absolute" top={8} left={8} style={{ zIndex: zIndex.cardOverlay }}>
          {topLeft}
        </Box>
      )}

      {bottomLeft && (
        <Box
          pos="absolute"
          bottom={8}
          left={8}
          style={{ zIndex: zIndex.cardOverlay }}
        >
          {bottomLeft}
        </Box>
      )}
    </Paper>
  );
}
