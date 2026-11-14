import { Box } from "@/ui-kit";
import type { Door } from "@/data/data";

type DoorPageProps = {
  currentDoor: Door;
};

const DoorPage = ({ currentDoor }: DoorPageProps) => {
  return <Box pt={100}>{currentDoor.name}</Box>;
};

export default DoorPage;
