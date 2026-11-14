/** Смысловые цвета текста. В приложении цвет задаётся только через tone. */
export const textTones = {
  /** Основной текст */
  default: "ink.9",
  /** Вторичный текст: подписи, пояснения, счётчики */
  muted: "ink.6",
  /** Акцентные ссылки */
  accent: "brand.8",
  /** Основной текст на тёмном фоне */
  inverse: "white",
  /** Вторичный текст на тёмном фоне */
  inverseMuted: "ink.3",
} as const;

export type TextTone = keyof typeof textTones;
