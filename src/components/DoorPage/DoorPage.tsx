import classes from "./DoorPage.module.css";
import type { Door } from "@/data/data";

type DoorPageProps = {
  currentDoor: Door;
};

const DoorPage = ({ currentDoor }: DoorPageProps) => {
  return <div className={classes.door__wrapper}>DoorPage</div>;
};

export default DoorPage;
