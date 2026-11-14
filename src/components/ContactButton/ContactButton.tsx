"use client";

import { useDisclosure } from "@mantine/hooks";
import { Button } from "@/ui-kit";
import ConsultationForm from "../ConsultationForm/ConsultationForm";

type ContactButtonProps = {
  title: string;
  variant: "primary" | "secondary" | "text";
  requestText?: string | null;
};

const ContactButton = ({ title, variant, requestText }: ContactButtonProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        variant={variant}
        size={variant === "primary" ? "lg" : "md"}
        onClick={open}
      >
        {title}
      </Button>
      <ConsultationForm
        opened={opened}
        onClose={close}
        requestText={requestText}
      />
    </>
  );
};

export default ContactButton;
