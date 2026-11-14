import type { Door } from "@/data/data";

type allFilters = {
  label: string;
  type: Door["kind"];
  subtype: Door["purpose"] | null;
};

export type ActiveFilter = {
  type: Door["kind"];
  subtype: Door["purpose"] | null;
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

export const sheetThicknessOptions = [{ value: 1.2 }, { value: 1.5 }];

// Группы оттенков: вариант двери попадает в группу по swatchHex (см. getColorGroupId).
export const doorColors = [
  { id: 1, color: "#EDEDED", name: "Белый" },
  { id: 2, color: "#E5DCCB", name: "Слоновая кость" },
  { id: 3, color: "#9A9792", name: "Серый" },
  { id: 4, color: "#3D3E42", name: "Графит" },
  { id: 5, color: "#6B4E36", name: "Коричневый" },
  { id: 6, color: "#5A2E2A", name: "Гранат" },
  { id: 7, color: "#2F4A3A", name: "Зелёный" },
  { id: 8, color: "#46627F", name: "Синий" },
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
  { value: "rich", label: "Сначала дороже" },
  { value: "cheap", label: "Сначала дешевле" },
];
