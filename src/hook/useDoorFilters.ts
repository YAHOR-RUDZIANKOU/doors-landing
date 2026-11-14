import type { Door } from "@/data/data";
import { getColorGroupId, getDoorSeries } from "@/utils/doorUtils";

type ActiveFilter = {
  type: Door["kind"];
  subtype: Door["purpose"] | null;
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
};

const useDoorFilters = ({
  allDoors,
  activeFilter,
  priceRange,
  selectedSheetThickness,
  selectedColorIds,
  selectedMaterials,
  selectedGlass,
}: UseDoorFiltersProps) => {
  const filterDoors = (ignoreFilter: IgnoreFilter = null) => {
    return allDoors.filter((card) => {
      if (activeFilter.type !== card.kind) return false;

      if (activeFilter.subtype && activeFilter.subtype !== card.purpose)
        return false;

      if (priceRange[0] > card.priceFrom) return false;
      if (priceRange[1] < card.priceFrom) return false;

      const sheetThickness = getDoorSeries(card)?.metalLeafMm;

      if (
        ignoreFilter !== "sheetThickness" &&
        card.kind === "entrance" &&
        selectedSheetThickness.length !== 0 &&
        (!sheetThickness || !selectedSheetThickness.includes(sheetThickness))
      )
        return false;

      if (ignoreFilter !== "color" && selectedColorIds.length !== 0) {
        const resultColor = card.variants.some((variant) =>
          selectedColorIds.includes(getColorGroupId(variant.outside.swatchHex)),
        );

        if (!resultColor) return false;
      }

      if (
        ignoreFilter !== "material" &&
        card.kind === "interior" &&
        selectedMaterials.length !== 0
      ) {
        if (!selectedMaterials.includes(card.material)) return false;
      }

      if (
        ignoreFilter !== "glass" &&
        card.kind === "interior" &&
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
