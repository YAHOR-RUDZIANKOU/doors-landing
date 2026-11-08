import Container from "../Container/Container";
import classes from "./Header.module.css";
import ContactButton from "../ContactButton/ContactButton";
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";

const Header = () => {
  return (
    <header className={classes.header}>
      <Container>
        <div className={classes.content__wrapper}>
          <HeaderNavigation />
          <div className={classes.block__inform}>
            <div className={classes.phone__wrapper}>
              <a href="tel:+375445541004" className={classes.phone__title}>
                +375 (44) 554-10-04
              </a>
              <span className={classes.phone__subtitle}>
                ежедневно 9:00–20:00
              </span>
            </div>

            <ContactButton title="Связаться со специалистом" variant='primary' />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
