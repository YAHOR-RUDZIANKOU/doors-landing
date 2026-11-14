import {
  createTheme,
  defaultVariantColorsResolver,
  type MantineColorsTuple,
  type VariantColorsResolver,
} from "@mantine/core";

/** Фирменный оранжевый: 0 — подложки, 5 — акцент, 8 — основной (кнопки, контролы, ссылки). */
const brand: MantineColorsTuple = [
  "#fff2e9",
  "#ffe2cf",
  "#fcc39f",
  "#f9a26c",
  "#ff8b45",
  "#f47b35",
  "#e36b20",
  "#b94d0c",
  "#a94710",
  "#78380f",
];

/** Нейтральная шкала: 0–1 — поверхности, 2–4 — границы, 5–7 — вторичный текст, 9 — основной текст. */
const ink: MantineColorsTuple = [
  "#f7f6f4",
  "#eef0f2",
  "#e6e8ea",
  "#b5bbc1",
  "#969da3",
  "#7b8188",
  "#626970",
  "#555b61",
  "#34383c",
  "#17191b",
];

const noBorder = "1px solid transparent";

/** Собственные варианты кнопок поверх стандартных вариантов Mantine. */
const variantColorResolver: VariantColorsResolver = (input) => {
  const { theme, variant } = input;
  const { brand, ink } = theme.colors;

  switch (variant) {
    case "primary":
      return {
        background: brand[5],
        hover: brand[4],
        color: ink[9],
        border: noBorder,
      };
    case "secondary":
      return {
        background: "transparent",
        hover: ink[9],
        color: ink[9],
        hoverColor: theme.white,
        border: `1px solid ${ink[9]}`,
      };
    case "text":
      return {
        background: "transparent",
        hover: "transparent",
        color: brand[8],
        hoverColor: brand[6],
        border: noBorder,
      };
    case "toggle":
      return {
        background: theme.white,
        hover: ink[0],
        color: ink[9],
        border: `1px solid ${ink[4]}`,
      };
    case "toggle-active":
      return {
        background: brand[0],
        hover: brand[0],
        color: ink[9],
        border: `1px solid ${brand[8]}`,
      };
    default:
      return defaultVariantColorsResolver(input);
  }
};

export const theme = createTheme({
  colors: { brand, ink },
  primaryColor: "brand",
  primaryShade: 8,
  black: ink[9],

  radius: { xs: "3px", sm: "5px", md: "8px", lg: "14px", xl: "30px" },
  defaultRadius: "sm",

  headings: {
    fontWeight: "600",
    sizes: {
      h1: {
        fontSize: "clamp(36px, 4vw, 68px)",
        lineHeight: "1.1",
        fontWeight: "700",
      },
      h2: { fontSize: "30px", lineHeight: "1.2" },
      h3: { fontSize: "16px", lineHeight: "1.4" },
      h4: { fontSize: "22px", lineHeight: "1.3", fontWeight: "700" },
    },
  },

  variantColorResolver,
});
