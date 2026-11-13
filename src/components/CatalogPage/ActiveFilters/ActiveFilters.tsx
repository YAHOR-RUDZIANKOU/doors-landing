import type { Door } from "@/data/data";
import classes from "./ActiveFilters.module.css";
import ActiveFilterTag from "@/components/ActiveFilterTag/ActiveFilterTag";
import { doorColors, priceStatic } from "@/data/dataFilters";

type ActiveFilter = {
  type: Door["type"];
  subtype: Door["subtype"] | null;
};

type CurrentColor = {
  color: string;
  name: string;
};

type ActiveFiltersProps = {
  filters: {
    activeFilter: ActiveFilter;
    priceRange: [number, number];
    selectedSheetThickness: number[];
    selectedMaterials: string[];
    selectedGlass: boolean[];
    currentColors: CurrentColor[];
  };

  handlers: {
    handleFilterChange: (
      type: Door["type"],
      subtype: Door["subtype"] | null,
    ) => void;
    handleSheetThicknessChange: (value: number) => void;
    handleMaterialChange: (value: string) => void;
    handleGlassChange: (value: boolean) => void;
    handleColorChange: (id: number) => void;
    handlePriceReset: () => void;
    handleResetFilters: () => void;
  };
};

const ActiveFilters = ({ filters, handlers }: ActiveFiltersProps) => {
  return (
    <div className={classes.tab__wrapper}>
      {filters.activeFilter.subtype === "apartment" && (
        <ActiveFilterTag
          title="Для квартиры"
          onRemove={() => handlers.handleFilterChange("entrance", null)}
        />
      )}

      {filters.activeFilter.subtype === "house" && (
        <ActiveFilterTag
          title="Для дома"
          onRemove={() => handlers.handleFilterChange("entrance", null)}
        />
      )}

      {filters.activeFilter.subtype === "swing" && (
        <ActiveFilterTag
          title="Распашные"
          onRemove={() => handlers.handleFilterChange("interior", null)}
        />
      )}

      {filters.activeFilter.subtype === "sliding" && (
        <ActiveFilterTag
          title="Раздвижные"
          onRemove={() => handlers.handleFilterChange("interior", null)}
        />
      )}

      {filters.activeFilter.subtype === "hidden" && (
        <ActiveFilterTag
          title="Скрытые"
          onRemove={() => handlers.handleFilterChange("interior", null)}
        />
      )}

      {filters.selectedSheetThickness.map((value) => (
        <ActiveFilterTag
          key={value}
          title={`Лист ${value} мм`}
          onRemove={() => handlers.handleSheetThicknessChange(value)}
        />
      ))}

      {filters.selectedMaterials.map((value) => (
        <ActiveFilterTag
          key={value}
          title={value}
          onRemove={() => handlers.handleMaterialChange(value)}
        />
      ))}

      {filters.selectedGlass.map((value) => (
        <ActiveFilterTag
          key={String(value)}
          title={value ? "С остеклением" : "Без остекления"}
          onRemove={() => handlers.handleGlassChange(value)}
        />
      ))}

      {filters.currentColors.map((value) => (
        <ActiveFilterTag
          key={value.color}
          title={value.name}
          onRemove={() => {
            const color = doorColors.find((item) => item.color === value.color);

            if (color) handlers.handleColorChange(color.id);
          }}
        />
      ))}

      {priceStatic[filters.activeFilter.type].min !== filters.priceRange[0] ||
      priceStatic[filters.activeFilter.type].max !== filters.priceRange[1] ? (
        <ActiveFilterTag
          title={`${filters.priceRange[0].toLocaleString("ru-RU")}-${filters.priceRange[1].toLocaleString("ru-RU")} BYN`}
          onRemove={handlers.handlePriceReset}
        />
      ) : null}

      <button
        type="button"
        className={classes.delete__filters}
        onClick={handlers.handleResetFilters}
      >
        Сбросить всё
      </button>
    </div>
  );
};

export default ActiveFilters;
