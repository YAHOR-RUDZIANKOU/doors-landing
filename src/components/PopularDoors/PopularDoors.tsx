"use client";

import { useState } from "react";
import classes from "./PopularDoors.module.css";
import Container from "../Container/Container";
import { topApartDoors } from "@/data/data";
import { topHouseDoors } from "@/data/data";
import DoorCard from "../DoorCard/DoorCard";
import Link from "next/link";

const PopularDoors = () => {
  const [activeCategory, setActiveCategory] = useState<"apartment" | "house">(
    "apartment",
  );
  const allTop = [...topApartDoors, ...topHouseDoors];
  return (
    <section className={classes.popular__section}>
      <Container>
        <div className={classes.popular__wrapper}>
          <h2 className={classes.popular__title}>Ходовые дизайны</h2>
          <div className={classes.popular__row}>
            <div className={classes.popular__subtitle}>
              Это примеры: любую дверь сделаем под ваш размер, цвет, и отделку.
            </div>
            <div className={classes.btn__wrapper}>
              <button
                className={`${classes.btn__general} ${activeCategory === "apartment" ? classes.btn__active : ""} `}
                onClick={() => setActiveCategory("apartment")}
              >
                Для квартиры
              </button>
              <button
                className={`${classes.btn__general} ${activeCategory === "house" ? classes.btn__active : ""} `}
                onClick={() => setActiveCategory("house")}
              >
                Для дома
              </button>
            </div>
          </div>
          <div className={classes.cards__wrapper}>
            <>
              {allTop.map((card) => (
                <DoorCard
                  activeCategory={activeCategory}
                  key={card.id}
                  door={card}
                />
              ))}
            </>
          </div>
          <Link href="/catalog" className={classes.btn__link}>Все входные - 16 моделей -&gt;</Link>
        </div>
      </Container>
    </section>
  );
};

export default PopularDoors;
