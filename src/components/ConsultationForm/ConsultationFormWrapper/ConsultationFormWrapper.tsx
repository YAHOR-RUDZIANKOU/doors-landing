"use client";
import classes from "./ConsultationFormWrapper.module.css";
import ConsultationForm from "../ConsultationForm";

type ConsultationFormWrapperProps = {
  setIsOpen: (value: boolean) => void;
};

const ConsultationFormWrapper = ({
  setIsOpen,
}: ConsultationFormWrapperProps) => {
  return (
    <div onClick={() => setIsOpen(false)} className={classes.form__wrapper}>
      <ConsultationForm onClose={()=>setIsOpen(false)} flag={true} />
    </div>
  );
};

export default ConsultationFormWrapper;
