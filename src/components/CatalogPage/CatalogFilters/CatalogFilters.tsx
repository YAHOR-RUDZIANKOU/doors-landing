"use client";

import classes from "./CatalogFilters.module.css";
import { entranceFilters, interiorFilters } from "@/data/dataFilters";
import { getDoorCount } from "@/utils/doorUtils";
import { allDoors } from "@/data/data";
import { RangeSlider } from "@mantine/core";
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
    <aside className={classes.catalog__filters}>
      <div className={classes.filters__type}>
        <h3 className={classes.filters__title}>Тип дверей</h3>

        <div className={classes.filters__group}>
          {entranceFilters.map((item, index) => {
            const isActive =
              activeFilter.type === item.type &&
              activeFilter.subtype === item.subtype;

            const itemClass =
              index === 0
                ? classes["filters__item--main"]
                : classes["filters__item--sub"];

            return (
              <label
                key={item.label}
                className={`${classes.filters__item} ${itemClass} ${
                  isActive ? classes["filters__item--active"] : ""
                }`}
              >
                <input
                  type="radio"
                  name="doorType"
                  checked={isActive}
                  onChange={() => handleFilterChange(item.type, item.subtype)}
                />

                <span className={classes.filters__label}>{item.label}</span>

                <span className={classes.filters__count}>
                  {getDoorCount({
                    allDoors,
                    type: item.type,
                    subtype: item.subtype,
                  })}
                </span>
              </label>
            );
          })}
        </div>

        <div className={classes.filters__group}>
          {interiorFilters.map((item, index) => {
            const isActive =
              activeFilter.type === item.type &&
              activeFilter.subtype === item.subtype;

            const itemClass =
              index === 0
                ? classes["filters__item--main"]
                : classes["filters__item--sub"];

            return (
              <label
                key={item.label}
                className={`${classes.filters__item} ${itemClass} ${
                  isActive ? classes["filters__item--active"] : ""
                }`}
              >
                <input
                  type="radio"
                  name="doorType"
                  checked={isActive}
                  onChange={() => handleFilterChange(item.type, item.subtype)}
                />

                <span className={classes.filters__label}>{item.label}</span>

                <span className={classes.filters__count}>
                  {getDoorCount({
                    allDoors,
                    type: item.type,
                    subtype: item.subtype,
                  })}
                </span>
              </label>
            );
          })}
        </div>
      </div>
      <div className={classes.price__wrapper}>
        <div className={classes.price__header}>
          <h3 className={classes.price__title}>Цена, BYN</h3>

          <span className={classes.price__value}>
            {priceRange[0].toLocaleString("ru-RU")} —{" "}
            {priceRange[1].toLocaleString("ru-RU")}
          </span>
        </div>

        <RangeSlider
          classNames={{
            root: classes.price__slider,
            track: classes.price__track,
            bar: classes.price__bar,
            thumb: classes.price__thumb,
          }}
          min={priceStatic[activeFilter.type].min}
          max={priceStatic[activeFilter.type].max}
          value={priceRange}
          onChange={(value) => setPriceRange(value)}
          label={null}
        />
      </div>
      {activeFilter.type === "entrance" && (
        <div className={classes.sheet__wrapper}>
          <h3 className={classes.sheet__title}>Толщина наружного листа</h3>

          <div className={classes.sheet__items}>
            {sheetThicknessOptions.map((item) => {
              const isActive = selectedSheetThickness.includes(item.value);

              const count = getCount({
                allDoors: sheetThicknessCountCards,
                predicate: (door) => door.sheetThickness === item.value,
              });

              const isDisabled = count === 0;

              return (
                <button
                  key={item.value}
                  type="button"
                  disabled={isDisabled}
                  className={`${classes.sheet__item} ${
                    isActive ? classes["sheet__item--active"] : ""
                  } ${isDisabled ? classes["sheet__item--disabled"] : ""}`}
                  onClick={() => handleSheetThicknessChange(item.value)}
                >
                  <span className={classes.sheet__value}>{item.value} мм</span>
                  <span className={classes.sheet__count}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {activeFilter.type === "interior" && (
        <>
          <div className={classes.material__wrapper}>
            <h3 className={classes.material__title}>Материал</h3>

            <div className={classes.material__items}>
              {materialFilters.map((item) => {
                const isActive = selectedMaterials.includes(item.value);

                const count = getCount({
                  allDoors: materialCountCards,
                  predicate: (door) => door.material === item.value,
                });

                const isDisabled = count === 0;

                return (
                  <label
                    key={item.id}
                    className={`${classes.material__item} ${
                      isDisabled ? classes["material__item--disabled"] : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isActive}
                      disabled={isDisabled}
                      className={`${classes.material__checkbox} ${
                        isActive ? classes["material__checkbox--active"] : ""
                      }`}
                      onChange={() => handleMaterialChange(item.value)}
                    />

                    <span className={classes.material__label}>
                      {item.value}
                    </span>

                    <span className={classes.material__count}>{count}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className={classes.glass__wrapper}>
            <h3 className={classes.glass__title}>Остекление</h3>

            <div className={classes.glass__items}>
              {glassFilters.map((item) => {
                const isActive = selectedGlass.includes(item.value);

                const count = getCount({
                  allDoors: glassCountCards,
                  predicate: (door) => door.hasGlass === item.value,
                });

                const isDisabled = count === 0;

                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={isDisabled}
                    className={`${classes.glass__item} ${
                      isActive ? classes["glass__item--active"] : ""
                    } ${isDisabled ? classes["glass__item--disabled"] : ""}`}
                    onClick={() => handleGlassChange(item.value)}
                  >
                    <span>{item.label}</span>
                    <span className={classes.glass__count}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
      <div className={classes.color__wrapper}>
        <h3 className={classes.color__title}>Цвет двери</h3>

        <div className={classes.color__items}>
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
              <button
                key={item.id}
                type="button"
                disabled={isDisabled}
                className={`${classes.color__item} ${
                  isActive ? classes["color__item--active"] : ""
                } ${isDisabled ? classes["color__item--disabled"] : ""}`}
                style={{ backgroundColor: item.color }}
                onClick={() => handleColorChange(item.id)}
                aria-label={`Выбрать цвет ${item.color}`}
                aria-pressed={isActive}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default CatalogFilters;
