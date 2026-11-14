"use client";

import CatalogFilters from "./CatalogFilters/CatalogFilters";
import {
  Box,
  Container,
  Divider,
  Flex,
  Group,
  Select,
  Stack,
  Text,
} from "@/ui-kit";
import { useState } from "react";
import { catalogContent } from "@/data/data";
import type { Door } from "@/data/data";
import { priceStatic } from "@/data/dataFilters";
import { sortOptions } from "@/data/dataFilters";
import type { ActiveFilter } from "@/data/dataFilters";
import CatalogProducts from "./CatalogProducts/CatalogProducts";
import { allDoors } from "@/data/data";
import { showColorsCards } from "@/utils/doorUtils";
import { doorColors } from "@/data/dataFilters";
import { getWordForm } from "@/utils/doorUtils";
import useDoorFilters from "@/hook/useDoorFilters";
import ActiveFilters from "./ActiveFilters/ActiveFilters";
import CatalogHero from "./CatalogHero/CatalogHero";

type SortBy = "rich" | "cheap";

const CatalogPage = () => {
  const [sortBy, setSortBy] = useState<SortBy>("cheap");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>({
    type: "entrance",
    subtype: null,
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([
    priceStatic.entrance.min,
    priceStatic.entrance.max,
  ]);
  const [selectedSheetThickness, setSelectedSheetThickness] = useState<
    number[]
  >([]);

  const [selectedColorIds, setSelectedColorIds] = useState<number[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedGlass, setSelectedGlass] = useState<boolean[]>([]);

  const handleFilterChange = (
    type: Door["kind"],
    subtype: Door["purpose"] | null,
  ) => {
    if (type !== activeFilter.type) {
      setPriceRange([priceStatic[type].min, priceStatic[type].max]);
    }

    setActiveFilter({ type, subtype });
  };

  const handleSheetThicknessChange = (value: number) => {
    setSelectedSheetThickness((prev) => {
      if (prev.includes(value)) {
        return prev.filter((currentSheet) => currentSheet !== value);
      }
      return [...prev, value];
    });
  };

  const handleColorChange = (id: number) => {
    setSelectedColorIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((colorId) => colorId !== id);
      }
      return [...prev, id];
    });
  };

  const handleMaterialChange = (value: string) => {
    setSelectedMaterials((prev) => {
      if (prev.includes(value)) {
        return prev.filter((material) => material !== value);
      }
      return [...prev, value];
    });
  };

  const handleGlassChange = (value: boolean) => {
    setSelectedGlass((prev) => {
      if (prev.includes(value)) {
        return prev.filter((glass) => glass !== value);
      }

      return [...prev, value];
    });
  };

  const currentColors = showColorsCards(selectedColorIds, doorColors);

  const {
    resultCards,
    sheetThicknessCountCards,
    colorCountCards,
    materialCountCards,
    glassCountCards,
  } = useDoorFilters({
    allDoors,
    activeFilter,
    priceRange,
    selectedSheetThickness,
    selectedColorIds,
    selectedMaterials,
    selectedGlass,
  });

  const getSortedCards = () => {
    const sortedCards = [...resultCards];
    if (sortBy === "rich") {
      sortedCards.sort((a, b) => b.priceFrom - a.priceFrom);
    } else if (sortBy === "cheap") {
      sortedCards.sort((a, b) => a.priceFrom - b.priceFrom);
    }
    return sortedCards;
  };

  const sortedCards = getSortedCards();

  const getHasActiveFilters = () => {
    return (
      activeFilter.subtype !== null ||
      selectedSheetThickness.length > 0 ||
      selectedColorIds.length > 0 ||
      selectedMaterials.length > 0 ||
      selectedGlass.length > 0 ||
      priceRange[0] !== priceStatic[activeFilter.type].min ||
      priceRange[1] !== priceStatic[activeFilter.type].max
    );
  };

  const hasActiveFilters = getHasActiveFilters();

  const handleResetFilters = () => {
    setActiveFilter({
      type: "entrance",
      subtype: null,
    });

    setPriceRange([priceStatic.entrance.min, priceStatic.entrance.max]);
    setSelectedSheetThickness([]);
    setSelectedColorIds([]);
    setSelectedMaterials([]);
    setSelectedGlass([]);
  };

  const handlePriceReset = () => {
    setPriceRange([
      priceStatic[activeFilter.type].min,
      priceStatic[activeFilter.type].max,
    ]);
  };

  return (
    <>
      <CatalogHero
        title={catalogContent[activeFilter.type].title}
        subtitle={catalogContent[activeFilter.type].subtitle}
      />

      <Container>
        <Stack gap="lg" pb="xl">
          <Box>
            <Group justify="flex-end" gap="lg" py="lg">
              <Text fz="lg" fw={600}>
                {resultCards.length > 0
                  ? `Найдено: ${resultCards.length} ${getWordForm(
                      resultCards.length,
                      ["модель", "модели", "моделей"],
                    )}`
                  : "Ни одной модели не найдено"}
              </Text>

              <Select
                w={260}
                data={sortOptions}
                value={sortBy}
                onChange={(value) => setSortBy(value as SortBy)}
                allowDeselect={false}
                aria-label="Сортировка"
              />
            </Group>

            <Divider />
          </Box>

          <Box mih={32}>
            {hasActiveFilters && (
              <ActiveFilters
                filters={{
                  activeFilter,
                  priceRange,
                  selectedSheetThickness,
                  selectedMaterials,
                  selectedGlass,
                  currentColors,
                }}
                handlers={{
                  handleFilterChange,
                  handleSheetThicknessChange,
                  handleMaterialChange,
                  handleGlassChange,
                  handleColorChange,
                  handlePriceReset,
                  handleResetFilters,
                }}
              />
            )}
          </Box>

          <Flex gap="xl" align="flex-start">
            <CatalogFilters
              activeFilter={activeFilter}
              priceRange={priceRange}
              selectedSheetThickness={selectedSheetThickness}
              selectedColorIds={selectedColorIds}
              selectedMaterials={selectedMaterials}
              selectedGlass={selectedGlass}
              handleFilterChange={handleFilterChange}
              handleSheetThicknessChange={handleSheetThicknessChange}
              handleColorChange={handleColorChange}
              handleMaterialChange={handleMaterialChange}
              handleGlassChange={handleGlassChange}
              setPriceRange={setPriceRange}
              resultCards={resultCards}
              sheetThicknessCountCards={sheetThicknessCountCards}
              colorCountCards={colorCountCards}
              materialCountCards={materialCountCards}
              glassCountCards={glassCountCards}
            />
            <CatalogProducts resultArray={sortedCards} />
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default CatalogPage;
