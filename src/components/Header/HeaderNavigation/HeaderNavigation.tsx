"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./HeaderNavigation.module.css";

const HeaderNavigation = () => {
  const pathname = usePathname();

  return (
    <div className={classes.links__wrapper}>
      <Link href="/" className={classes.link__logo}>
        <span className={classes.logoIcon} />
        <span className={classes.link__main}>СТАЛЬНАЯ ЛИНИЯ</span>
      </Link>

      <nav className={classes.links__navigation}>
        <Link
          href="/catalog"
          className={`${classes.link__text} ${
            pathname === "/catalog" ? classes.active : ""
          }`}
        >
          Каталог
        </Link>

        <Link
          href="/contacts"
          className={`${classes.link__text} ${
            pathname === "/contacts" ? classes.active : ""
          }`}
        >
          Контакты
        </Link>
      </nav>
    </div>
  );
};

export default HeaderNavigation;
