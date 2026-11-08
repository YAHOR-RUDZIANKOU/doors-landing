"use client";
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
  return (
    <div onClick={() => setIsOpen(false)} className={classes.form__wrapper}>
      <ConsultationForm
        onClose={() => setIsOpen(false)}
        flag={true}
        requestText={requestText}
      />
    </div>
  );
};

export default ConsultationFormWrapper;
