import { Divider as MantineDivider, type DividerProps } from "@mantine/core";

export type { DividerProps };

export function Divider(props: DividerProps) {
  return <MantineDivider color="ink.2" {...props} />;
}
