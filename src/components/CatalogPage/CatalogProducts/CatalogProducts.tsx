import { SimpleGrid } from "@/ui-kit";
import type { Door } from "@/data/data";
import DoorCard from "@/components/DoorCard/DoorCard";

type CatalogProductsProps = {
  resultArray: Door[];
};

const CatalogProducts = ({ resultArray }: CatalogProductsProps) => {
  return (
    <SimpleGrid cols={4} flex={1}>
      {resultArray.map((card) => (
        <DoorCard key={card.id} door={card} />
      ))}
    </SimpleGrid>
  );
};

export default CatalogProducts;
