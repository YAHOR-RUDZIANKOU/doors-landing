"use client";

import { entranceFilters, interiorFilters } from "@/data/dataFilters";
import { getDoorCount } from "@/utils/doorUtils";
import { allDoors } from "@/data/data";
import {
  CheckboxCard,
  ColorSwatchButton,
  Group,
  RadioCard,
  RangeSlider,
  Stack,
  Text,
  Title,
  ToggleButton,
} from "@/ui-kit";
import { sheetThicknessOptions } from "@/data/dataFilters";
import { doorColors } from "@/data/dataFilters";
import { materialFilters } from "@/data/dataFilters";
import { glassFilters } from "@/data/dataFilters";
import { getCount } from "@/utils/doorUtils";
import type { ActiveFilter } from "@/data/dataFilters";
import type { Door } from "@/data/data";
import { priceStatic } from "@/data/dataFilters";

type CatalogFiltersProps = {
  activeFilter: ActiveFilter;
  priceRange: [number, number];
  selectedSheetThickness: number[];
  selectedColorIds: number[];
  selectedMaterials: string[];
  selectedGlass: boolean[];

  handleFilterChange: (
    type: Door["type"],
    subtype: Door["subtype"] | null,
  ) => void;

  handleSheetThicknessChange: (value: number) => void;
  handleColorChange: (id: number) => void;
  handleMaterialChange: (value: string) => void;
  handleGlassChange: (value: boolean) => void;
  setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  resultCards: Door[];
  sheetThicknessCountCards: Door[];
  colorCountCards: Door[];
  materialCountCards: Door[];
  glassCountCards: Door[];
};

const CatalogFilters = ({
  activeFilter,
  priceRange,
  selectedSheetThickness,
  selectedColorIds,
  selectedMaterials,
  selectedGlass,
  handleFilterChange,
  handleSheetThicknessChange,
  handleColorChange,
  handleMaterialChange,
  handleGlassChange,
  setPriceRange,
  sheetThicknessCountCards,
  colorCountCards,
  materialCountCards,
  glassCountCards,
}: CatalogFiltersProps) => {
  return (
    <Stack component="aside" gap="lg" w={270} pos="sticky" top={100}>
      <Stack gap="sm">
        <Title order={3}>Тип дверей</Title>

        {[entranceFilters, interiorFilters].map((group) => (
          <Stack key={group[0].type} gap={0}>
            {group.map((item, index) => {
              const isActive =
                activeFilter.type === item.type &&
                activeFilter.subtype === item.subtype;
              const isMain = index === 0;

              return (
                <RadioCard
                  key={item.label}
                  name="doorType"
                  checked={isActive}
                  pl={isMain ? "sm" : "xl"}
                  onClick={() => handleFilterChange(item.type, item.subtype)}
                >
                  <Text span flex={1} fw={isMain ? 600 : 400}>
                    {item.label}
                  </Text>

                  <Text span tone="muted" fz="sm">
                    {getDoorCount({
                      allDoors,
                      type: item.type,
                      subtype: item.subtype,
                    })}
                  </Text>
                </RadioCard>
              );
            })}
          </Stack>
        ))}
      </Stack>

      <Stack gap="lg">
        <Group justify="space-between">
          <Title order={3}>Цена, BYN</Title>

          <Text fw={500}>
            {priceRange[0].toLocaleString("ru-RU")} —{" "}
            {priceRange[1].toLocaleString("ru-RU")}
          </Text>
        </Group>

        <RangeSlider
          min={priceStatic[activeFilter.type].min}
          max={priceStatic[activeFilter.type].max}
          value={priceRange}
          onChange={(value) => setPriceRange(value)}
        />
      </Stack>

      {activeFilter.type === "entrance" && (
        <Stack gap="sm">
          <Title order={3}>Толщина наружного листа</Title>

          <Group gap="xs">
            {sheetThicknessOptions.map((item) => {
              const count = getCount({
                allDoors: sheetThicknessCountCards,
                predicate: (door) => door.sheetThickness === item.value,
              });

              return (
                <ToggleButton
                  key={item.value}
                  active={selectedSheetThickness.includes(item.value)}
                  disabled={count === 0}
                  count={count}
                  onClick={() => handleSheetThicknessChange(item.value)}
                >
                  {item.value} мм
                </ToggleButton>
              );
            })}
          </Group>
        </Stack>
      )}

      {activeFilter.type === "interior" && (
        <>
          <Stack gap="sm">
            <Title order={3}>Материал</Title>

            <Stack gap={0}>
              {materialFilters.map((item) => {
                const count = getCount({
                  allDoors: materialCountCards,
                  predicate: (door) => door.material === item.value,
                });

                return (
                  <CheckboxCard
                    key={item.id}
                    checked={selectedMaterials.includes(item.value)}
                    disabled={count === 0}
                    onClick={() => handleMaterialChange(item.value)}
                  >
                    <Text span flex={1}>
                      {item.value}
                    </Text>

                    <Text span tone="muted" fz="sm">
                      {count}
                    </Text>
                  </CheckboxCard>
                );
              })}
            </Stack>
          </Stack>

          <Stack gap="sm">
            <Title order={3}>Остекление</Title>

            <Group gap="xs">
              {glassFilters.map((item) => {
                const count = getCount({
                  allDoors: glassCountCards,
                  predicate: (door) => door.hasGlass === item.value,
                });

                return (
                  <ToggleButton
                    key={item.id}
                    active={selectedGlass.includes(item.value)}
                    disabled={count === 0}
                    count={count}
                    onClick={() => handleGlassChange(item.value)}
                  >
                    {item.label}
                  </ToggleButton>
                );
              })}
            </Group>
          </Stack>
        </>
      )}

      <Stack gap="sm">
        <Title order={3}>Цвет двери</Title>

        <Group gap="md">
          {doorColors.map((item) => {
            const isActive = selectedColorIds.includes(item.id);

            const isDisabled =
              !isActive &&
              !colorCountCards.some((card) =>
                card.colorDoor.some(
                  (colorItem) => colorItem.color === item.color,
                ),
              );

            return (
              <ColorSwatchButton
                key={item.id}
                color={item.color}
                selected={isActive}
                disabled={isDisabled}
                onClick={() => handleColorChange(item.id)}
                aria-label={`Выбрать цвет ${item.name}`}
              />
            );
          })}
        </Group>
      </Stack>
    </Stack>
  );
};

export default CatalogFilters;
