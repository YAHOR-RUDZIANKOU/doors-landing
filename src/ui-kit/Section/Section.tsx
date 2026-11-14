import { Box, type BoxProps } from "@mantine/core";

export interface SectionProps extends Omit<BoxProps, "bg"> {
  children?: React.ReactNode;
  /** subtle — секция на светло-серой подложке */
  tone?: "default" | "subtle";
}

/** Секция страницы с вертикальными отступами. */
export function Section({ tone = "default", ...props }: SectionProps) {
  return (
    <Box
      component="section"
      py={80}
      bg={tone === "subtle" ? "ink.0" : undefined}
      {...props}
    />
  );
}
