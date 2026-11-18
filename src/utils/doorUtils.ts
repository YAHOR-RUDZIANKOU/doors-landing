import { entranceSizes, series } from "@/data/data";
import type { Door, EntranceDoor } from "@/data/data";

type allDoorColor = {
  id: number;
  color: string;
  name:string
};

type GetDoorCountProps = {
  allDoors: Door[];
  type: Door["kind"];
  subtype: Door["purpose"] | null;
};

type GetCountProps = {
  allDoors: Door[];
  predicate: (door: Door) => boolean;
};

export const getDoorCount = ({
  allDoors,
  type,
  subtype,
}: GetDoorCountProps) => {
  return subtype
    ? allDoors.filter(
        (value) => value.kind === type && value.purpose === subtype,
      ).length
    : allDoors.filter((value) => value.kind === type).length;
};

export const getCount = ({ allDoors, predicate }: GetCountProps) => {
  return allDoors.filter(predicate).length;
};

export const getDoorSeries = (door: Door) =>
  door.kind === "entrance"
    ? series[door.defaultSeries ?? door.availableSeries[0]]
    : undefined;

export const purposeLabels: Record<Door["purpose"], string> = {
  apartment: "для квартиры",
  house: "для дома",
  swing: "распашная",
  sliding: "раздвижная",
  hidden: "скрытая",
};

type SpecRow = [string, string | null | undefined];

const withValues = (rows: SpecRow[]) =>
  rows.filter((row): row is [string, string] => Boolean(row[1]));

const formatSheetMm = (mm?: number) =>
  mm ? `${mm.toLocaleString("ru-RU", { minimumFractionDigits: 1 })} мм` : null;

const formatNoise = (db?: number | null) => (db ? `−${db} дБ` : null);

const formatThermalBreak = (value: boolean | "optional") =>
  value === "optional" ? "по комплектации" : value ? "есть" : "нет";

// Значения без повторов через запятую.
const joinUnique = (values: (string | null)[]) =>
  [...new Set(values.filter(Boolean))].join(", ");

export const getSpecs = (door: Door): [string, string][] => {
  if (door.kind === "interior") {
    return [
      ["Материал", door.material],
      ["Открывание", purposeLabels[door.purpose]],
      ["Стекло", door.hasGlass ? "есть" : "нет"],
    ];
  }

  const series = getDoorSeries(door);
  if (!series) return [];

  return withValues([
    ["Наружный лист", formatSheetMm(series.metalLeafMm)],
    ["Толщина полотна", `${series.leafThicknessMm} мм`],
    ["Шумоизоляция", formatNoise(series.noiseDbMin)],
    ["Утеплитель", series.insulationLeaf],
    ["Терморазрыв", formatThermalBreak(series.thermalBreak)],
  ]);
};

export const getSpecGroups = (door: EntranceDoor) => {
  const series = getDoorSeries(door);
  if (!series) return [];

  const { variants } = door;

  const groups = [
    {
      title: "Полотно",
      rows: withValues([
        ["Наружный лист", formatSheetMm(series.metalLeafMm)],
        ["Лист коробки", formatSheetMm(series.metalFrameMm)],
        ["Толщина полотна", `${series.leafThicknessMm} мм`],
        ["Толщина коробки", `${series.frameThicknessMm} мм`],
        ["Стандартные размеры", entranceSizes.standard],
        ["Под заказ", entranceSizes.custom],
      ]),
    },
    {
      title: "Тепло и звук",
      rows: withValues([
        ["Утеплитель", series.insulationLeaf],
        ["Утеплитель коробки", series.insulationFrame],
        ["Шумоизоляция", formatNoise(series.noiseDbMin)],
        ["Контуры уплотнения", String(series.seals)],
        ["Терморазрыв", formatThermalBreak(series.thermalBreak)],
      ]),
    },
    {
      title: "Фурнитура",
      rows: withValues([
        [
          "Ручки",
          joinUnique(variants.flatMap((v) => v.handles.map((h) => h.model))),
        ],
        ["Умный замок", joinUnique(variants.map((v) => v.smartLock))],
      ]),
    },
    {
      title: "Отделка",
      rows: withValues([
        ["Снаружи", joinUnique(variants.map((v) => v.outside.material))],
        ["Внутри", joinUnique(variants.map((v) => v.inside.material))],
        ["Цвета", joinUnique(variants.map((v) => v.outside.color))],
      ]),
    },
  ];

  return groups.filter((group) => group.rows.length > 0);
};

// Возвращает id группы оттенков из doorColors по hex-цвету.
export const getColorGroupId = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const max = Math.max(r, g, b);
  const chroma = max - Math.min(r, g, b);
  const lightness = (max + Math.min(r, g, b)) / 510;

  if (chroma <= 16) {
    if (lightness > 0.75) return 1;
    return lightness > 0.35 ? 3 : 4;
  }

  let hue = 60 * ((r - g) / chroma) + 240;
  if (max === r) hue = (60 * ((g - b) / chroma) + 360) % 360;
  else if (max === g) hue = 60 * ((b - r) / chroma) + 120;

  if (hue < 12 || hue >= 330) return 6;
  if (hue < 60) return lightness > 0.7 ? 2 : 5;
  return hue < 180 ? 7 : 8;
};

export const showColorsCards = (
  currentIds: number[],
  allDoorColor: allDoorColor[],
) => {
  return allDoorColor
    .filter((color) => currentIds.includes(color.id))
    .map((card) => ({
  color: card.color,
  name: card.name,
}));
};

export const getWordForm = (
  count: number,
  words: [string, string, string],
) => {
  const lastTwo = count % 100;
  const lastDigit = count % 10;

  if (lastTwo >= 11 && lastTwo <= 14) return words[2];

  if (lastDigit === 1) return words[0];

  if (lastDigit >= 2 && lastDigit <= 4) return words[1];

  return words[2];
};

// Платёж в месяц при рассрочке на 24 месяца, округлён вверх.
export const getMonthlyPayment = (price: number) => Math.ceil(price / 24);
