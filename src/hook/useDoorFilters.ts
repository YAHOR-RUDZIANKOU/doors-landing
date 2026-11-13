import type { Door } from "@/data/data";

type currentColorsProps = {
  color: string;
  name: string;
};

type ActiveFilter = {
  type: Door["type"];
  subtype: Door["subtype"] | null;
};

type IgnoreFilter = "sheetThickness" | "color" | "material" | "glass" | null;

type UseDoorFiltersProps = {
  allDoors: Door[];
  activeFilter: ActiveFilter;
  priceRange: [number, number];
  selectedSheetThickness: number[];
  selectedColorIds: number[];
  selectedMaterials: string[];
  selectedGlass: boolean[];
  currentColors: currentColorsProps[];
};

const useDoorFilters = ({
  allDoors,
  activeFilter,
  priceRange,
  selectedSheetThickness,
  selectedColorIds,
  selectedMaterials,
  selectedGlass,
  currentColors,
}: UseDoorFiltersProps) => {
  const filterDoors = (ignoreFilter: IgnoreFilter = null) => {
    return allDoors.filter((card) => {
      if (activeFilter.type !== card.type) return false;

      if (activeFilter.subtype && activeFilter.subtype !== card.subtype)
        return false;

      if (priceRange[0] > card.price) return false;
      if (priceRange[1] < card.price) return false;

      if (
        ignoreFilter !== "sheetThickness" &&
        card.sheetThickness &&
        selectedSheetThickness.length !== 0 &&
        !selectedSheetThickness.includes(card.sheetThickness)
      )
        return false;

      if (ignoreFilter !== "color" && selectedColorIds.length !== 0) {
        const resultColor = card.colorDoor.some((colorItem) =>
          currentColors.some((value) => value.color === colorItem.color),
        );

        if (!resultColor) return false;
      }

      if (
        ignoreFilter !== "material" &&
        card.material &&
        selectedMaterials.length !== 0
      ) {
        if (!selectedMaterials.includes(card.material)) return false;
      }

      if (
        ignoreFilter !== "glass" &&
        card.hasGlass !== undefined &&
        selectedGlass.length !== 0
      ) {
        if (!selectedGlass.includes(card.hasGlass)) return false;
      }

      return true;
    });
  };

  const resultCards = filterDoors();
  const sheetThicknessCountCards = filterDoors("sheetThickness");
  const colorCountCards = filterDoors("color");
  const materialCountCards = filterDoors("material");
  const glassCountCards = filterDoors("glass");

  return {
    resultCards,
    sheetThicknessCountCards,
    colorCountCards,
    materialCountCards,
    glassCountCards,
  };
};

export default useDoorFilters;
