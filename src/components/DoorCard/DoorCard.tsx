"use client";

import { useState } from "react";
import {
  Badge,
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

type DoorCardProps = {
  door: Door;
};

const DoorCard = ({ door }: DoorCardProps) => {
  const [activeColor, setActiveColor] = useState(0);

  const selectedColor = door.colorDoor[activeColor];
  const imageUrl = selectedColor?.urlImg || door.url;

  const isEntrance = door.type === "entrance";
  const doorRoute = getDoorRoute(door.slug);

  return (
    <Stack gap="xs">
      <Card
        radius="lg"
        ratio={0.9}
        href={doorRoute}
        linkLabel={door.name}
        topLeft={door.badge && <Badge>{door.badge}</Badge>}
        bottomLeft={
          <Group gap="xs">
            {door.colorDoor.map((item, index) => (
              <ColorSwatchButton
                key={item.color}
                color={item.color}
                size={20}
                withBorder
                selected={activeColor === index}
                onClick={() => setActiveColor(index)}
                aria-label={`Выбрать цвет ${item.color}`}
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
        от {door.price.toLocaleString("ru-RU")} BYN{" "}
        {!isEntrance && (
          <Text span tone="muted" fz="sm" fw={400}>
            за комплект
          </Text>
        )}
      </Text>

      <Text tone="muted" truncate>
        {isEntrance ? door.description : door.categoryLabel}{" "}
        <Link href={doorRoute} fw={500}>
          {door.name}
        </Link>
      </Text>

      <Text tone="muted" fz="sm">
        {isEntrance
          ? `лист ${door.sheetThickness} мм · замки кл. ${door.lockClass} · -${door.soundInsulation} дБ`
          : door.description}
      </Text>
    </Stack>
  );
};

export default DoorCard;
