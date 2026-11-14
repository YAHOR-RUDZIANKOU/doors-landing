"use client";

import { Modal as MantineModal, type ModalProps } from "@mantine/core";
import { zIndex } from "../theme";

export type { ModalProps };

export function Modal(props: ModalProps) {
  return (
    <MantineModal
      centered
      radius="md"
      padding="xl"
      zIndex={zIndex.modal}
      overlayProps={{ backgroundOpacity: 0.55 }}
      {...props}
    />
  );
}
