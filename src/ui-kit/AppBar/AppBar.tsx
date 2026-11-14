import { Box, alpha } from "@mantine/core";
import { zIndex } from "../theme";

export type AppBarProps = {
  children?: React.ReactNode;
  /** Полупрозрачный фон (например, когда страница прокручена) */
  translucent?: boolean;
};

/** Тёмная шапка, закреплённая у верхнего края окна. */
export function AppBar({ children, translucent = false }: AppBarProps) {
  return (
    <Box
      component="header"
      pos="fixed"
      top={0}
      w="100%"
      bg={translucent ? alpha("var(--mantine-color-ink-9)", 0.6) : "ink.9"}
      style={{
        zIndex: zIndex.header,
        backdropFilter: "blur(16px) brightness(0.35)",
        transition: "background-color 0.3s ease",
      }}
    >
      {children}
    </Box>
  );
}
