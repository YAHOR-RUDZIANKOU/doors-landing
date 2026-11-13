"use client";
import Container from "../Container/Container";
import classes from "./Header.module.css";
import ContactButton from "../ContactButton/ContactButton";
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`${classes.header} ${isScrolled ? classes.header__scrolled : ""}`}
    >
      <div className={classes.header__inner}>
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

              <ContactButton
                title="Связаться со специалистом"
                variant="primary"
              />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
