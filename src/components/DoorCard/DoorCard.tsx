"use client";

import { useState } from "react";
import Image from "next/image";
import classes from "./DoorCard.module.css";
import type { Door } from "@/data/data";

type DoorCardProps = {
  door: Door;
  activeCategory: "apartment" | "house";
};

const DoorCard = ({ door, activeCategory }: DoorCardProps) => {
  const [activeColor, setActiveColor] = useState(0);

  const selectedColor = door.colorDoor[activeColor];

  const imageUrl = selectedColor?.urlImg || door.url;

  return (
    <div
      className={`${classes.card__wrapper} ${activeCategory === door.subtype ? "" : classes.hidden} `}
    >
      <div className={classes.card__img}>
        {door.badge && (
          <span className={classes.card__badge}>{door.badge}</span>
        )}

        <Image
          className={classes.card__image}
          src={imageUrl}
          alt={`Входная дверь ${door.name}`}
          width={300}
          height={400}
        />

        <div className={classes.card__colors}>
          {door.colorDoor.map((item, index) => (
            <button
              key={item.color}
              type="button"
              className={`${classes.card__color} ${
                activeColor === index ? classes["card__color--active"] : ""
              }`}
              data-color={item.color}
              onClick={() => setActiveColor(index)}
              aria-label={`Выбрать цвет ${item.color}`}
              aria-pressed={activeColor === index}
            />
          ))}
        </div>
      </div>

      {door.type === "entrance" && (
        <>
          <div className={classes.card__price}>
            от {door.price.toLocaleString("ru-RU")} BYN
          </div>

          <div className={classes.card__info}>
            <p className={classes.card__name}>
              {door.description} <span>{door.name}</span>
            </p>

            <p className={classes.card__description}>
              лист {door.sheetThickness} мм · замки кл. {door.lockClass} · -
              {door.soundInsulation} дБ
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default DoorCard;
