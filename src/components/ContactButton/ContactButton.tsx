"use client";
import { useState } from "react";
import classes from "./ContactButton.module.css";
import ConsultationFormWrapper from "../ConsultationForm/ConsultationFormWrapper/ConsultationFormWrapper";

type ContactButtonProps = {
  title: string;
  variant: "primary" | "secondary" | "text";
  requestText?: string|null;
};

const variantClasses = {
  primary: classes["contact__btn--primary"],
  secondary: classes["contact__btn--secondary"],
  text: classes["contact__btn--text"],
};

const ContactButton = ({ title, variant, requestText }: ContactButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`${classes.contact__btn} ${variantClasses[variant]}`}
      >
        {title}
      </button>
      {isOpen && (
        <ConsultationFormWrapper
          setIsOpen={setIsOpen}
          requestText={requestText}
        />
      )}
    </>
  );
};

export default ContactButton;
