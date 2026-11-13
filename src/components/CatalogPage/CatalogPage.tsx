"use client";

import CatalogFilters from "./CatalogFilters/CatalogFilters";
import { Select } from "@mantine/core";
import { useState } from "react";
import Link from "next/link";
import classes from "./CatalogPage.module.css";
import { catalogContent } from "@/data/data";
import Container from "../Container/Container";
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

type SortBy = "rating" | "rich" | "cheap";

const CatalogPage = () => {
  const [sortBy, setSortBy] = useState<SortBy>("rating");
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
    type: Door["type"],
    subtype: Door["subtype"] | null,
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
    currentColors,
  });

  const sortedCards = [...resultCards];
  if (sortBy === "rating") {
    sortedCards.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "rich") {
    sortedCards.sort((a, b) => b.price - a.price);
  } else if (sortBy === "cheap") {
    sortedCards.sort((a, b) => a.price - b.price);
  }

  const hasActiveFilters =
    activeFilter.subtype !== null ||
    selectedSheetThickness.length > 0 ||
    selectedColorIds.length > 0 ||
    selectedMaterials.length > 0 ||
    selectedGlass.length > 0 ||
    priceRange[0] !== priceStatic[activeFilter.type].min ||
    priceRange[1] !== priceStatic[activeFilter.type].max;

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
      <div className={classes.catalog__wrapper}>
        <Container>
          <div className={classes.catalog__header}>
            <nav className={classes.catalog__link} aria-label="Хлебные крошки">
              <Link href="/">Главная</Link>
              <span>/</span>
              <Link href="/catalog">Каталог</Link>
              <span>/</span>
              <span aria-current="page">
                {catalogContent[activeFilter.type].title}
              </span>
            </nav>

            <h1 className={classes.catalog__title}>
              {catalogContent[activeFilter.type].title}
            </h1>

            <p className={classes.catalog__subtitle}>
              {catalogContent[activeFilter.type].subtitle}
            </p>
          </div>
        </Container>
      </div>
      <Container>
        <div className={classes.catalog__toolbar}>
          <div className={classes.toolbar__sort}>
            {resultCards.length > 0 ? (
              <div className={classes.toolbar__title}>
                {`Найдено: ${resultCards.length} ${getWordForm(
                  resultCards.length,
                  ["модель", "модели", "моделей"],
                )}`}
              </div>
            ) : (
              <div className={classes.toolbar__title}>
                Ни одной модели не найдено
              </div>
            )}
            <Select
              classNames={{
                root: classes.catalog__sort,
                input: classes.catalog__sortInput,
                dropdown: classes.catalog__sortDropdown,
                option: classes.catalog__sortOption,
              }}
              data={sortOptions}
              value={sortBy}
              onChange={(value) => setSortBy(value as SortBy)}
              allowDeselect={false}
              rightSection={<span className={classes.catalog__sortArrow} />}
              rightSectionPointerEvents="none"
            />
          </div>
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

          <div className={classes.catalog__content}>
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
          </div>
        </div>
      </Container>
    </>
  );
};

export default CatalogPage;
