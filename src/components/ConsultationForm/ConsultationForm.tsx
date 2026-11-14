"use client";

import { Modal, Title } from "@/ui-kit";
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
      title={<Title order={2}>Связаться со специалистом</Title>}
      closeButtonProps={{ "aria-label": "Закрыть форму" }}
    >
      <Form requestText={requestText} />
    </Modal>
  );
};

export default ConsultationForm;
