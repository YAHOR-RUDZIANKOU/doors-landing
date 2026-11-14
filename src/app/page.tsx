import { Box } from "@/ui-kit";
import DesignSelection from "@/components/DesignSelection/DesignSelection";
import PopularDoors from "@/components/PopularDoors/PopularDoors";

export default function Home() {
  return (
    <Box component="main">
      <DesignSelection />
      <PopularDoors />
    </Box>
  );
}
