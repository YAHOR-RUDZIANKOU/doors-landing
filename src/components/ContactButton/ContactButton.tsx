"use client";
import { useState } from "react";
import classes from "./ContactButton.module.css";
import ConsultationFormWrapper from "../ConsultationForm/ConsultationFormWrapper/ConsultationFormWrapper";

const ContactButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className={classes.contact__btn}>
        Связаться со специалистом
      </button>
      {isOpen && <ConsultationFormWrapper setIsOpen={setIsOpen} />}
    </>
  );
};

export default ContactButton;
