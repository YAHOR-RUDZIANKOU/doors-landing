"use client";
import { createPortal } from "react-dom";
import classes from "./ConsultationFormWrapper.module.css";
import ConsultationForm from "../ConsultationForm";

type ConsultationFormWrapperProps = {
  setIsOpen: (value: boolean) => void;
  requestText?: string | null;
};

const ConsultationFormWrapper = ({
  setIsOpen,
  requestText,
}: ConsultationFormWrapperProps) => {
  return createPortal(
    <div onClick={() => setIsOpen(false)} className={classes.form__wrapper}>
      <ConsultationForm
        onClose={() => setIsOpen(false)}
        flag={true}
        requestText={requestText}
      />
    </div>,
    document.body,
  );
};

export default ConsultationFormWrapper;
