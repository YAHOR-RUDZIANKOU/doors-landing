"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Link,
  NativeSelect,
  Stack,
  Text,
  TextInput,
} from "@/ui-kit";
import { ROUTES } from "@/navigation";

const callTimeOptions = [
  { value: "anytime", label: "В любое время, 9:00−20:00" },
  { value: "morning", label: "Утром, 9:00−12:00" },
  { value: "afternoon", label: "Днём, 12:00−17:00" },
  { value: "evening", label: "Вечером, 17:00−20:00" },
];

interface FormProps {
  requestText?: string | null;
}

export default function Form({ requestText }: FormProps) {
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
    <Box component="form" onSubmit={handleSubmit}>
      <Stack gap="lg">
        <Text tone="muted" fz="sm">
          Оставьте телефон — специалист перезвонит, ответит на вопросы и поможет
          выбрать модель.
        </Text>

        {requestText && (
          <Card>
            <Text tone="muted" fz="sm">
              Вы выбрали
            </Text>
            <Text fw={500}>{requestText}</Text>
          </Card>
        )}

        <TextInput
          label="Имя"
          withAsterisk
          placeholder="Как к вам обращаться"
          value={name}
          onFocus={() => setErrorName(false)}
          onChange={(event) => setName(event.target.value)}
          error={
            errorName &&
            "Как к вам обращаться? Без имени замерщику будет сложно вас найти."
          }
        />

        <TextInput
          label="Телефон"
          withAsterisk
          type="tel"
          placeholder="+375  (__)  ___-__-__"
          value={phone}
          onFocus={() => setErrorPhone(null)}
          onChange={(event) => setPhone(event.target.value)}
          error={errorPhone}
        />

        <NativeSelect
          label="Когда удобно принять звонок"
          data={callTimeOptions}
          value={callTime}
          onChange={(event) => setCallTime(event.target.value)}
        />

        <Checkbox
          checked={hasPrivacyConsent}
          onChange={(event) => setHasPrivacyConsent(event.target.checked)}
          label={
            <>
              Согласен на обработку персональных данных по{" "}
              <Link href={ROUTES.privacyPolicy} tone="accent" inherit>
                политике конфиденциальности
              </Link>
            </>
          }
        />

        <Button type="submit" size="xl" fullWidth>
          Перезвоните мне
        </Button>

        <Text tone="muted" fz="sm">
          Звоним только по этой заявке, без рассылок и спама
        </Text>
      </Stack>
    </Box>
  );
}
