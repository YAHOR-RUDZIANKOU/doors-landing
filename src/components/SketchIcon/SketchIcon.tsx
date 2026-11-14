import classes from "./SketchIcon.module.css";

/** Иконка «эскиз»: пунктирный контур двери с кругом. */
const SketchIcon = () => {
  return (
    <div className={classes.frame}>
      <div className={classes.circle} />
    </div>
  );
};

export default SketchIcon;
