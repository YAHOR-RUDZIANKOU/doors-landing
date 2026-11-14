import { Button, Group, Tag } from "@/ui-kit";
import type { Door } from "@/data/data";
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
    <Group gap="xs">
      {filters.activeFilter.subtype === "apartment" && (
        <Tag
          label="Для квартиры"
          onRemove={() => handlers.handleFilterChange("entrance", null)}
        />
      )}

      {filters.activeFilter.subtype === "house" && (
        <Tag
          label="Для дома"
          onRemove={() => handlers.handleFilterChange("entrance", null)}
        />
      )}

      {filters.activeFilter.subtype === "swing" && (
        <Tag
          label="Распашные"
          onRemove={() => handlers.handleFilterChange("interior", null)}
        />
      )}

      {filters.activeFilter.subtype === "sliding" && (
        <Tag
          label="Раздвижные"
          onRemove={() => handlers.handleFilterChange("interior", null)}
        />
      )}

      {filters.activeFilter.subtype === "hidden" && (
        <Tag
          label="Скрытые"
          onRemove={() => handlers.handleFilterChange("interior", null)}
        />
      )}

      {filters.selectedSheetThickness.map((value) => (
        <Tag
          key={value}
          label={`Лист ${value} мм`}
          onRemove={() => handlers.handleSheetThicknessChange(value)}
        />
      ))}

      {filters.selectedMaterials.map((value) => (
        <Tag
          key={value}
          label={value}
          onRemove={() => handlers.handleMaterialChange(value)}
        />
      ))}

      {filters.selectedGlass.map((value) => (
        <Tag
          key={String(value)}
          label={value ? "С остеклением" : "Без остекления"}
          onRemove={() => handlers.handleGlassChange(value)}
        />
      ))}

      {filters.currentColors.map((value) => (
        <Tag
          key={value.color}
          label={value.name}
          onRemove={() => {
            const color = doorColors.find((item) => item.color === value.color);

            if (color) handlers.handleColorChange(color.id);
          }}
        />
      ))}

      {priceStatic[filters.activeFilter.type].min !== filters.priceRange[0] ||
      priceStatic[filters.activeFilter.type].max !== filters.priceRange[1] ? (
        <Tag
          label={`${filters.priceRange[0].toLocaleString("ru-RU")}-${filters.priceRange[1].toLocaleString("ru-RU")} BYN`}
          onRemove={handlers.handlePriceReset}
        />
      ) : null}

      <Button variant="text" onClick={handlers.handleResetFilters}>
        Сбросить всё
      </Button>
    </Group>
  );
};

export default ActiveFilters;
