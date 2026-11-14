import doorsJson from "./doors.json";

export const designCards = [
  {
    id: 1,
    title: "Фрезеровка «Рамка»",
    subtitle: "МДФ 16 мм, эмаль антрацит",
    image: "/images/doors/doorOne.png",
  },
  {
    id: 2,
    title: "Фрезеровка «Горизонт»",
    subtitle: "МДФ 10 мм, дуб натуральный",
    image: "/images/doors/doorTwo.png",
  },
  {
    id: 3,
    title: "Фрезеровка «Вертикаль»",
    subtitle: "Термопанель, тёмный орех",
    image: "/images/doors/doorThree.png",
  },
  {
    id: 4,
    title: "Фрезеровка «Гладкая»",
    subtitle: "Порошковая окраска «муар»",
    image: "/images/doors/doorFour.png",
  },
  {
    id: 5,
    title: "Фрезеровка «Рамка»",
    subtitle: "МДФ 16 мм, белый ясень",
    image: "/images/doors/doorFive.png",
  },
  {
    id: 6,
    title: "Фрезеровка «Горизонт»",
    subtitle: "Медный антик",
    image: "/images/doors/doorSix.png",
  },
];

export const catalogContent = {
  entrance: {
    title: "Входные двери",
    subtitle:
      "Ходовые дизайны — это примеры. Каждую дверь делаем под заказ по вашим размерам и дизайну.",
  },
  interior: {
    title: "Межкомнатные двери",
    subtitle:
      "Ходовые дизайны из МДФ на каркасе из массива и из массива дуба — распашные, раздвижные и скрытые. Делаем под ваш проём; рисунок и цвет совпадают со входными. Цена «от» — за комплект 800 × 2 000.",
  },
};

export type DoorSeries = {
  purpose: string;
  leafThicknessMm: number;
  frameThicknessMm: number;
  seals: number;
  sealsDescription: string;
  insulationLeaf: string;
  insulationFrame: string;
  // стальные двери
  metalLeafMm?: number;
  metalFrameMm?: number;
  panelInsideMm?: number;
  panelOutsideMm?: number;
  thermalBreak?: boolean | string;
  noiseDbMin?: number | null;
  options?: string;
  note?: string | null;
  // «Хаски»
  thermalBreakLeaf?: boolean | string;
  thermalBreakFrame?: boolean;
  thresholdSteelCover?: boolean;
  glazing?: string;
  source?: string;
};

export type DoorImage = {
  image: string;
  imageSize: number[];
};

export type DoorSide = DoorImage & {
  pattern: string | null;
  baguette: string | null;
  raw: string;
  material: string;
  color: string | null;
  colorCode: string | null;
  texture: string | null;
  patina: string | null;
  insert: string | null;
  stripe: string | null;
  molding: string | null;
  swatchHex: string;
};

export type DoorVariant = {
  id: string;
  catalogSeries: string | null;
  availableSeries: string[];
  outside: DoorSide;
  inside: DoorSide;
  frame: string;
  trim: string | null;
  portal: string | null;
  decor: string | null;
  window: string | null;
  smartLock: string | null;
  handles: { type: string; model: string; finish: string | null }[];
  note: string | null;
  sourcePage: number;
};

export type EntranceDoor = {
  id: string;
  name: string;
  kind: "entrance";
  line: "steel" | "husky";
  purpose: "apartment" | "house";
  style: string;
  description: string | null;
  priceFrom: number;
  inStock: boolean | null;
  availableSeries: string[];
  defaultSeries: string | null;
  gallery: {
    interior: DoorImage | null;
    detail: DoorImage | null;
  };
  variants: DoorVariant[];
  source: { file: string; page: number };
};

// Межкомнатных в doors.json пока нет — моковые данные.
export type InteriorDoor = {
  id: string;
  name: string;
  kind: "interior";
  purpose: "swing" | "sliding" | "hidden";
  description: string;
  priceFrom: number;
  material: string;
  hasGlass: boolean;
  variants: {
    id: string;
    outside: Pick<DoorSide, "image" | "swatchHex">;
  }[];
};

export type Door = EntranceDoor | InteriorDoor;

export const series: Record<string, DoorSeries> = doorsJson.series;

const interiorVariants = (id: string, image: string, colors: string[]) =>
  colors.map((swatchHex, index) => ({
    id: `${id}-v${index + 1}`,
    outside: { image, swatchHex },
  }));

const interiorDoors: InteriorDoor[] = [
  {
    id: "kalcit",
    name: "Кальцит",
    kind: "interior",
    purpose: "swing",
    description: "МДФ + массив · распашная · без стекла",
    priceFrom: 390,
    material: "МДФ на каркасе из массива",
    hasGlass: false,
    variants: interiorVariants("kalcit", "/images/doors/doorOne.png", [
      "#F2F1ED",
      "#C9C9C3",
      "#E5DCCB",
      "#27292A",
    ]),
  },
  {
    id: "alba",
    name: "Альба",
    kind: "interior",
    purpose: "swing",
    description: "Массив · распашная · без стекла",
    priceFrom: 450,
    material: "МДФ на каркасе из массива",
    hasGlass: false,
    variants: interiorVariants("alba", "/images/doors/doorTwo.png", [
      "#F2F1ED",
      "#D8CBB8",
      "#967653",
      "#303236",
    ]),
  },
  {
    id: "venecia",
    name: "Венеция",
    kind: "interior",
    purpose: "swing",
    description: "Массив · распашная · со стеклом",
    priceFrom: 520,
    material: "МДФ на каркасе из массива",
    hasGlass: true,
    variants: interiorVariants("venecia", "/images/doors/doorThree.png", [
      "#F2F1ED",
      "#E5DCCB",
      "#795C49",
      "#454545",
    ]),
  },
  {
    id: "modern-interior",
    name: "Модерн",
    kind: "interior",
    purpose: "swing",
    description: "Массив · распашная · без стекла",
    priceFrom: 480,
    material: "МДФ на каркасе из массива",
    hasGlass: false,
    variants: interiorVariants("modern-interior", "/images/doors/doorFour.png", [
      "#C9C9C3",
      "#F2F1ED",
      "#49382F",
      "#303236",
    ]),
  },
  {
    id: "verona",
    name: "Верона",
    kind: "interior",
    purpose: "swing",
    description: "Массив · распашная · со стеклом",
    priceFrom: 590,
    material: "Массив дуба",
    hasGlass: true,
    variants: interiorVariants("verona", "/images/doors/doorFive.png", [
      "#F2F1ED",
      "#D8CBB8",
      "#967653",
      "#27292A",
    ]),
  },
  {
    id: "tuf",
    name: "Туф",
    kind: "interior",
    purpose: "sliding",
    description: "МДФ + массив · раздвижная · со стеклом",
    priceFrom: 520,
    material: "Массив дуба",
    hasGlass: true,
    variants: interiorVariants("tuf", "/images/doors/doorSix.png", [
      "#A09F9A",
      "#E5E2DC",
      "#A68A6A",
    ]),
  },
  {
    id: "onyx",
    name: "Оникс",
    kind: "interior",
    purpose: "hidden",
    description: "МДФ + массив · скрытая · без стекла",
    priceFrom: 690,
    material: "МДФ на каркасе из массива",
    hasGlass: false,
    variants: interiorVariants("onyx", "/images/doors/doorSeven.png", [
      "#F2F1ED",
      "#C9C9C3",
    ]),
  },
];

export const allDoors: Door[] = [
  ...(doorsJson.doors as EntranceDoor[]),
  ...interiorDoors,
];
