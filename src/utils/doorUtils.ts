import type { Door } from "@/data/data";

type allDoorColor = {
  id: number;
  color: string;
  name:string
};

type GetDoorCountProps = {
  allDoors: Door[];
  type: Door["type"];
  subtype: Door["subtype"] | null;
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
        (value) => value.type === type && value.subtype === subtype,
      ).length
    : allDoors.filter((value) => value.type === type).length;
};

export const getCount = ({ allDoors, predicate }: GetCountProps) => {
  return allDoors.filter(predicate).length;
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