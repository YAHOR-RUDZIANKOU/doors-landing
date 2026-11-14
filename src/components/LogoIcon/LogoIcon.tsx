import classes from "./LogoIcon.module.css";

/** Иконка логотипа: дверь с оранжевой ручкой. */
const LogoIcon = () => {
  return (
    <div className={classes.door}>
      <div className={classes.handle} />
    </div>
  );
};

export default LogoIcon;
