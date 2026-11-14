"use client";

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";

type UiKitProviderProps = {
  children: React.ReactNode;
};

export function UiKitProvider({ children }: UiKitProviderProps) {
  return (
    <MantineProvider theme={theme} forceColorScheme="light">
      {children}
    </MantineProvider>
  );
}
