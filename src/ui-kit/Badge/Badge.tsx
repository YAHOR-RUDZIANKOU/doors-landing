"use client";

import { Badge as MantineBadge, type BadgeProps } from "@mantine/core";

export type { BadgeProps };

export function Badge(props: BadgeProps) {
  return <MantineBadge size="lg" radius="sm" tt="none" fw={600} {...props} />;
}
