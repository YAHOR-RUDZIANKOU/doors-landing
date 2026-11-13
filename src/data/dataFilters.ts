import type { Door } from "@/data/data";

type allFilters = {
  label: string;
  type: "entrance" | "interior";
  subtype: string | null;
};

export type ActiveFilter = {
  type: Door["type"];
  subtype: Door["subtype"] | null;
};

export const entranceFilters: allFilters[] = [
  { label: "Все входные", type: "entrance", subtype: null },
  { label: "В квартиру", type: "entrance", subtype: "apartment" },
  { label: "В дом", type: "entrance", subtype: "house" },
];

export const interiorFilters: allFilters[] = [
  { label: "Все межкомнатные", type: "interior", subtype: null },
  { label: "Распашные", type: "interior", subtype: "swing" },
  { label: "Раздвижные", type: "interior", subtype: "sliding" },
  { label: "Скрытые", type: "interior", subtype: "hidden" },
];

export const priceStatic = {
  entrance: {
    min: 1890,
    max: 3890,
  },
  interior: {
    min: 390,
    max: 690,
  },
};

export const sheetThicknessOptions = [
  { value: 1.5 },
  { value: 1.8 },
  { value: 2.0 },
  { value: 2.5 },
];

export const doorColors = [
  { id: 1, color: "#303236", name: "Графит" },
  { id: 2, color: "#49382F", name: "Шоколад" },
  { id: 3, color: "#E5E2DC", name: "Слоновая кость" },
  { id: 4, color: "#795C49", name: "Каштан" },
  { id: 5, color: "#454545", name: "Серый" },
  { id: 6, color: "#F0EDE7", name: "Молочный" },
  { id: 7, color: "#967653", name: "Дуб" },
  { id: 8, color: "#858585", name: "Серебро" },
];

export const materialFilters = [
  { id: 1, value: "МДФ на каркасе из массива" },
  { id: 2, value: "Массив дуба" },
];

export const glassFilters = [
  { id: 1, value: false, label: "Без стекла" },
  { id: 2, value: true, label: "Со стеклом" },
];

export const sortOptions = [
  { value: "rating", label: "Сначала популярные" },
  { value: "rich", label: "Сначала дороже" },
  { value: "cheap", label: "Сначала дешевле" },
];
