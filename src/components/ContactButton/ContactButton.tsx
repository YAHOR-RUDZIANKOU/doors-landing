"use client";

import { useDisclosure } from "@mantine/hooks";
import { Button } from "@/ui-kit";
import ConsultationForm from "../ConsultationForm/ConsultationForm";

type ContactButtonProps = {
  title: string;
  variant: "primary" | "accent" | "secondary" | "text";
  requestText?: string | null;
  fullWidth?: boolean;
};

const ContactButton = ({
  title,
  variant,
  requestText,
  fullWidth,
}: ContactButtonProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        variant={variant}
        size={variant === "primary" || variant === "accent" ? "lg" : "md"}
        fullWidth={fullWidth}
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
