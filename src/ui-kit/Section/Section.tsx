import { Box, type BoxProps, type ElementProps } from "@mantine/core";

export interface SectionProps
  extends Omit<BoxProps, "bg">,
    ElementProps<"section"> {
  children?: React.ReactNode;
  tone?: "default" | "subtle";
}


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
