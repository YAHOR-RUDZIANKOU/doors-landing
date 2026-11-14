"use client";

import NextImage from "next/image";
import {
  Image as MantineImage,
  type ImageProps as MantineImageProps,
} from "@mantine/core";

export type ImageProps = MantineImageProps &
  Omit<React.ComponentProps<typeof NextImage>, keyof MantineImageProps>;

/** Картинка с оптимизацией Next.js. По умолчанию вписывается в контейнер целиком. */
export function Image(props: ImageProps) {
  return (
    <MantineImage
      component={NextImage}
      fit="contain"
      w="100%"
      h="100%"
      {...props}
    />
  );
}
