"use client";

import {
  Breadcrumbs as MantineBreadcrumbs,
  type BreadcrumbsProps,
} from "@mantine/core";

export type { BreadcrumbsProps };

export function Breadcrumbs(props: BreadcrumbsProps) {
  return (
    <MantineBreadcrumbs
      role="navigation"
      separator="/"
      separatorMargin="sm"
      c="ink.3"
      fz="md"
      {...props}
    />
  );
}
