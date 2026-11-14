"use client";

import {
  Container,
  Group,
  Link,
  Section,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@/ui-kit";
import { useState } from "react";
import { allDoors } from "@/data/data";
import { getDoorCount, getWordForm } from "@/utils/doorUtils";
import DoorCard from "../DoorCard/DoorCard";
import { ROUTES } from "@/navigation";

type Category = "apartment" | "house";

const categoryOptions: { value: Category; label: string }[] = [
  { value: "apartment", label: "Для квартиры" },
  { value: "house", label: "Для дома" },
];

const PopularDoors = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("apartment");
  const visibleDoors = allDoors
    .filter((door) => door.purpose === activeCategory)
    .slice(0, 4);
  const entranceCount = getDoorCount({
    allDoors,
    type: "entrance",
    subtype: null,
  });
  return (
    <Section tone="subtle">
      <Container>
        <Stack>
          <Title order={2}>Ходовые дизайны</Title>

          <Group justify="space-between">
            <Text tone="muted" fz="sm">
              Это примеры: любую дверь сделаем под ваш размер, цвет, и отделку.
            </Text>

            <SegmentedControl
              data={categoryOptions}
              value={activeCategory}
              onChange={setActiveCategory}
            />
          </Group>

          <SimpleGrid cols={4}>
            {visibleDoors.map((card) => (
              <DoorCard key={card.id} door={card} />
            ))}
          </SimpleGrid>

          <Link href={ROUTES.catalog} tone="accent" fz="lg" fw={600}>
            Все входные - {entranceCount}{" "}
            {getWordForm(entranceCount, ["модель", "модели", "моделей"])} -&gt;
          </Link>
        </Stack>
      </Container>
    </Section>
  );
};

export default PopularDoors;
