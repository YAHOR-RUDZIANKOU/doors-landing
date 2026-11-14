import { allDoors } from "@/data/data";
import DoorPage from "@/components/DoorPage/DoorPage";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const currentDoor = allDoors.find((card) => card.id === slug);
  if (!currentDoor) {
    notFound();
  }

  return <DoorPage currentDoor={currentDoor} />;
};

export default page;
