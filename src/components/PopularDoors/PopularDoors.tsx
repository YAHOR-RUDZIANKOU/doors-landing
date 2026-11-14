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
import { topApartDoors } from "@/data/data";
import { topHouseDoors } from "@/data/data";
import DoorCard from "../DoorCard/DoorCard";
import { ROUTES } from "@/navigation";

type Category = "apartment" | "house";

const categoryOptions: { value: Category; label: string }[] = [
  { value: "apartment", label: "Для квартиры" },
  { value: "house", label: "Для дома" },
];

const PopularDoors = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("apartment");
  const visibleDoors = [...topApartDoors, ...topHouseDoors].filter(
    (door) => door.subtype === activeCategory,
  );
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
            Все входные - 16 моделей -&gt;
          </Link>
        </Stack>
      </Container>
    </Section>
  );
};

export default PopularDoors;
