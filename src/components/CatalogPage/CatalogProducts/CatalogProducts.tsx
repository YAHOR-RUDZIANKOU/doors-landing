import type { Door } from "@/data/data";
import DoorCard from "@/components/DoorCard/DoorCard";
import classes from "./CatalogProducts.module.css";

type CatalogProductsProps = {
  resultArray: Door[];
};

const CatalogProducts = ({ resultArray }: CatalogProductsProps) => {
  return (
    <div className={classes.cards__wrapper}>
      {resultArray.map((card) => (
        <DoorCard key={card.id} door={card} />
      ))}
    </div>
  );
};

export default CatalogProducts;
