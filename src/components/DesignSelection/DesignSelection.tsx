import classes from "./DesignSelection.module.css";
import Container from "../Container/Container";
import Image from "next/image";
import ContactButton from "../ContactButton/ContactButton";
import { designCards } from "@/data/data";

export default function DesignSelection() {
  return (
    <section className={classes.design}>
      <Container>
        <div className={classes.design__wrapper}>
          <div className={classes.design__title}>
            <h2>
              Отделка, цвет и рисунок
              <br />— на ваш выбор
            </h2>
          </div>

          <div className={classes.design__subtitle}>
            <p>
              Порошковая окраска, МДФ-панели с фрезеровкой, эмаль, зеркало
              внутри. 8 цветов и любой оттенок по RAL под заказ.
            </p>
          </div>

          <div className={classes.design__cards}>
            {designCards.map((card) => (
              <div className={classes.design__card} key={card.id}>
                <div className={classes.design__cardImage}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={300}
                    height={400}
                    className={classes.design__image}
                  />
                </div>

                <div className={classes.design__cardContent}>
                  <h3>{card.title}</h3>
                  <p>{card.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={classes.design__bottom}>
            <div className={classes.design__bottomIcon}>
              <span />
            </div>

            <div className={classes.design__bottomText}>
              <h3>Можем сделать по вашему эскизу</h3>
              <p>
                Рисунок фрезеровки, сочетание цветов, вставки — пришлите
                набросок или фото, технолог скажет, что получится и сколько
                стоит.
              </p>
            </div>

            <ContactButton title="Обсудить эскиз" variant="secondary" requestText="Дверь по моему эскизу - пришлю набросок после звонка" />
          </div>
        </div>
      </Container>
    </section>
  );
}
