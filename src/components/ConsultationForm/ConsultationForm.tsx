"use client";

import { Modal } from "@/ui-kit";
import Form from "./Form";

type ConsultationFormProps = {
  opened: boolean;
  onClose: () => void;
  requestText?: string | null;
};

const ConsultationForm = ({
  opened,
  onClose,
  requestText,
}: ConsultationFormProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      title="Связаться со специалистом"
      styles={{
        title: {
          fontSize: "var(--mantine-h2-font-size)",
          fontWeight: "var(--mantine-h2-font-weight)",
          lineHeight: "var(--mantine-h2-line-height)",
        },
      }}
      closeButtonProps={{ "aria-label": "Закрыть форму" }}
    >
      <Form requestText={requestText} />
    </Modal>
  );
};

export default ConsultationForm;
