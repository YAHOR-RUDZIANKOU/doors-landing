import { X } from "lucide-react";
import classes from "./ActiveFilterTag.module.css";

type ActiveFilterTagProps = {
  title: string;
  onRemove: () => void;
};

const ActiveFilterTag = ({ title, onRemove }: ActiveFilterTagProps) => {
  return (
    <div className={classes.filter}>
      <span className={classes.filter__title}>{title}</span>

      <div onClick={onRemove} className={classes["filter__close--wrapper"]}>
        <div className={classes.filter__close} aria-label="Удалить фильтр">
          <X size={14} />
        </div>
      </div>
    </div>
  );
};

export default ActiveFilterTag;
