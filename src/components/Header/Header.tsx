import Link from "next/link";
import Container from "../Container/Container";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <Container>
        <div className={classes.content__wrapper}>
          <div className={classes.links__wrapper}>
            <Link href="/" className={classes.link__logo}>
              <span className={classes.logoIcon} />
              <span>СТАЛЬНАЯ ЛИНИЯ</span>
            </Link>

            <nav className={classes.links__navigation}>
              <Link href="/catalog" className={classes.link__text}>
                Каталог
              </Link>

              <Link href="/contacts" className={classes.link__text}>
                Контакты
              </Link>
            </nav>
          </div>

          <div className={classes.block__inform}>
            <div className={classes.phone__wrapper}>
              <a href="tel:+375445541004" className={classes.phone__title}>
                +375 (44) 554-10-04
              </a>
              <span className={classes.phone__subtitle}>ежедневно 9:00–20:00</span>
            </div>

            <button type="button" className={classes.button}>
              Связаться со специалистом
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
