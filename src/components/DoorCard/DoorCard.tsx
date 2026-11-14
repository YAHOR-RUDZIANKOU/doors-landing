"use client";

import { useState } from "react";
import {
  Card,
  ColorSwatchButton,
  Group,
  Image,
  Link,
  Stack,
  Text,
} from "@/ui-kit";
import { getDoorRoute } from "@/navigation";
import type { Door } from "@/data/data";
import { getDoorSeries } from "@/utils/doorUtils";

type DoorCardProps = {
  door: Door;
};

const DoorCard = ({ door }: DoorCardProps) => {
  const [activeVariant, setActiveVariant] = useState(0);

  const imageUrl = door.variants[activeVariant].outside.image;

  const isEntrance = door.kind === "entrance";
  const doorRoute = getDoorRoute(door.id);
  const doorSeries = getDoorSeries(door);

  return (
    <Stack gap="xs">
      <Card
        radius="lg"
        ratio={0.9}
        href={doorRoute}
        linkLabel={door.name}
        bottomLeft={
          <Group gap="xs">
            {door.variants.map((item, index) => (
              <ColorSwatchButton
                key={item.id}
                color={item.outside.swatchHex}
                size={20}
                withBorder
                selected={activeVariant === index}
                onClick={() => setActiveVariant(index)}
                aria-label={`Выбрать цвет ${item.outside.swatchHex}`}
              />
            ))}
          </Group>
        }
      >
        <Image
          src={imageUrl}
          alt={`Входная дверь ${door.name}`}
          width={300}
          height={400}
        />
      </Card>

      <Text fz="xl" fw={700}>
        от {door.priceFrom.toLocaleString("ru-RU")} BYN{" "}
        {!isEntrance && (
          <Text span tone="muted" fz="sm" fw={400}>
            за комплект
          </Text>
        )}
      </Text>

      <Text tone="muted" truncate>
        {isEntrance
          ? door.purpose === "apartment"
            ? "Входная в квартиру"
            : "Входная в дом"
          : "Межкомнатная"}{" "}
        <Link href={doorRoute} fw={500}>
          {door.name}
        </Link>
      </Text>

      <Text tone="muted" fz="sm">
        {isEntrance
          ? [
              doorSeries?.metalLeafMm && `лист ${doorSeries.metalLeafMm} мм`,
              `полотно ${doorSeries?.leafThicknessMm} мм`,
              doorSeries?.noiseDbMin && `-${doorSeries.noiseDbMin} дБ`,
            ]
              .filter(Boolean)
              .join(" · ")
          : door.description}
      </Text>
    </Stack>
  );
};

export default DoorCard;
