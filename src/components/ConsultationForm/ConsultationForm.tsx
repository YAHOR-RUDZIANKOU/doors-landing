"use client";

import { useState } from "react";
import styles from "./ConsultationForm.module.css";

const callTimeOptions = [
  { value: "anytime", label: "В любое время, 9:00−20:00" },
  { value: "morning", label: "Утром, 9:00−12:00" },
  { value: "afternoon", label: "Днём, 12:00−17:00" },
  { value: "evening", label: "Вечером, 17:00−20:00" },
];

interface ConsultationFormProps {
  onClose?: () => void;
  flag?: boolean;
  variant?: "primary" | "secondary" | "text";
  requestText?: string|null;
}

export default function ConsultationForm({
  onClose,
  flag,
  requestText,
}: ConsultationFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [callTime, setCallTime] = useState("anytime");
  const [hasPrivacyConsent, setHasPrivacyConsent] = useState(false);

  const [errorName, setErrorName] = useState(false);
  const [errorPhone, setErrorPhone] = useState<string | null>(null);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim().length) {
      setErrorName(true);
      return;
    }
    if (!phone.trim().length) {
      setErrorPhone("Введите номер телефона");
      return;
    }

    const digits = phone.replace(/\D/g, "");

    if (digits.length !== 12) {
      setErrorPhone("Номер неполный после 375 нужно 9 цифр");
      return;
    }

    const phoneCode = digits.slice(3, 5);
    const cityCode = digits.slice(3, 6);

    const validCodes = ["25", "29", "33", "44"];

    if (!validCodes.includes(phoneCode) && cityCode !== "232") {
      setErrorPhone("Проверьте код: 25, 29, 33, 44 или городской 232");
      return;
    }
    console.log(123456);
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className={styles.form}>
      {flag && (
        <button
          type="button"
          className={styles.form__close}
          onClick={onClose}
          aria-label="Закрыть форму"
        >
          ×
        </button>
      )}

      <div className={styles.form__header}>
        <h2 className={styles.form__title}>Связаться со специалистом</h2>

        <p className={styles.form__subtitle}>
          Оставьте телефон — специалист перезвонит, ответит на вопросы и поможет
          выбрать модель.
        </p>
      </div>

      <form className={styles.form__content} onSubmit={handleSubmit}>
        {requestText && (
          <div className={styles.form__request}>
            <span className={styles.form__requestLabel}>Вы выбрали</span>

            <p className={styles.form__requestText}>{requestText}</p>
          </div>
        )}
        <div className={styles.name__wrapper}>
          <label htmlFor="consultation-name" className={styles.name__text}>
            Имя <span>*</span>
          </label>

          <input
            id="consultation-name"
            type="text"
            className={styles.name__input}
            onFocus={() => setErrorName(false)}
            placeholder="Как к вам обращаться"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {errorName && (
            <div className={styles.error__text}>
              Как к вам обращаться? Без имени замерщику будет сложно вас найти.
            </div>
          )}
        </div>

        <div className={styles.phone__wrapper}>
          <label htmlFor="consultation-phone" className={styles.phone__text}>
            Телефон <span>*</span>
          </label>

          <input
            id="consultation-phone"
            type="tel"
            onFocus={() => setErrorPhone(null)}
            className={styles.phone__input}
            placeholder="+375  (__)  ___-__-__"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          {errorPhone && <div className={styles.error__text}>{errorPhone}</div>}
        </div>

        <div className={styles.time__wrapper}>
          <label htmlFor="consultation-time" className={styles.time__text}>
            Когда удобно принять звонок
          </label>

          <select
            id="consultation-time"
            className={styles.time__select}
            value={callTime}
            onChange={(event) => setCallTime(event.target.value)}
          >
            {callTimeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <label className={styles.privacy__wrapper}>
          <input
            type="checkbox"
            className={styles.privacy__checkbox}
            checked={hasPrivacyConsent}
            onChange={(event) => setHasPrivacyConsent(event.target.checked)}
          />

          <span className={styles.privacy__text}>
            Согласен на обработку персональных данных по{" "}
            <a href="/privacy-policy">политике конфиденциальности</a>
          </span>
        </label>

        <button type="submit" className={styles.form__submit}>
          Перезвоните мне
        </button>

        <p className={styles.form__note}>
          Звоним только по этой заявке, без рассылок и спама
        </p>
      </form>
    </div>
  );
}
