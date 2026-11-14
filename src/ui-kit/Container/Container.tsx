import {
  Container as MantineContainer,
  type ContainerProps,
} from "@mantine/core";

export type { ContainerProps };

/** Контентная колонка сайта: 1200px по центру. */
export function Container(props: ContainerProps) {
  return <MantineContainer size={1200} px={0} w="100%" {...props} />;
}
