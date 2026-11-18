"use client";

import { useState } from "react";
import {
  Box,
  ColorSwatchButton,
  Flex,
  Group,
  Image,
  Link,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@/ui-kit";
import { doorBenefits, type Door } from "@/data/data";
import { getMonthlyPayment, getSpecs, purposeLabels } from "@/utils/doorUtils";
import ContactButton from "@/components/ContactButton/ContactButton";

type DoorOverviewProps = {
  door: Door;
};

type Side = "outside" | "inside";

const DoorOverview = ({ door }: DoorOverviewProps) => {
  const [activeVariant, setActiveVariant] = useState(0);
  const [side, setSide] = useState<Side>("outside");

  const isEntrance = door.kind === "entrance";
  const imageUrl = isEntrance
    ? door.variants[activeVariant][side].image
    : door.variants[activeVariant].outside.image;

  const colorName = isEntrance
    ? door.variants[activeVariant].outside.color
    : null;

  return (
    <SimpleGrid cols={2} spacing="xl" verticalSpacing="lg">
      <Flex pos="relative" mih={520} p="xl" bg="ink.1" bdrs="lg">
        <Box pos="relative" flex={1}>
          <Image
            src={imageUrl}
            alt={`Дверь ${door.name}`}
            fill
            sizes="50vw"
          />
        </Box>
        {isEntrance && (
          <SegmentedControl
            pos="absolute"
            top={16}
            right={16}
            bg="ink.2"
            value={side}
            onChange={(value) => setSide(value as Side)}
            data={[
              { label: "Снаружи", value: "outside" },
              { label: "Внутри", value: "inside" },
            ]}
          />
        )}
      </Flex>

      <Stack gap="md">
        <Stack gap={4}>
          <Text tone="muted" fz="sm">
            {isEntrance ? "Входная" : "Межкомнатная"} ·{" "}
            {purposeLabels[door.purpose]}
          </Text>
          <Title order={1} size={30}>{door.name}</Title>
        </Stack>

        <Stack gap={4}>
          <Text fz={28} fw={700} lh={1.1}>
            от {door.priceFrom.toLocaleString("ru-RU")} BYN{" "}
            {!isEntrance && (
              <Text span tone="muted" fz="sm" fw={400}>
                за комплект
              </Text>
            )}
          </Text>
          <Text tone="muted" fz="sm">
            или от {getMonthlyPayment(door.priceFrom)} BYN/мес · рассрочка 24
            мес
          </Text>
          <Text tone="muted" fz="sm">
            • Под заказ по вашему размеру и дизайну · от 14 дней
          </Text>
        </Stack>

        <Stack gap="xs">
          <Text fz="sm">
            <Text span tone="muted" inherit>
              {isEntrance ? "Цвет снаружи" : "Цвет"}
              {colorName && ": "}
            </Text>
            <Text span fw={600} inherit>
              {colorName}
            </Text>
          </Text>
          <Group gap="xs">
            {door.variants.map((item, index) => (
              <ColorSwatchButton
                key={item.id}
                color={item.outside.swatchHex}
                withBorder
                selected={activeVariant === index}
                onClick={() => setActiveVariant(index)}
                aria-label={`Выбрать цвет ${item.outside.swatchHex}`}
              />
            ))}
          </Group>
        </Stack>

        <Stack gap="xs">
          <Text fw={600}>О модели</Text>
          {getSpecs(door).map(([label, value]) => (
            <Group key={label} justify="space-between" wrap="nowrap">
              <Text tone="muted" fz="sm">
                {label}
              </Text>
              <Text fz="sm" ta="right">
                {value}
              </Text>
            </Group>
          ))}
          {isEntrance && (
            <Link href="#specs" tone="accent" fz="sm" fw={600}>
              Все характеристики
            </Link>
          )}
        </Stack>

        <Box mt="auto">
          <ContactButton
            title="Связаться со специалистом"
            variant="accent"
            requestText={`Дверь ${door.name}`}
            fullWidth
          />
        </Box>
      </Stack>

      <Stack
        component="ul"
        gap="xs"
        m={0}
        p="md"
        bd="1px solid ink.2"
        bdrs="md"
        style={{ listStyle: "none", gridColumn: 2 }}
      >
        {doorBenefits.map(({ id, icon: Icon, title, text }) => (
          <Group key={id} component="li" gap="xs" wrap="nowrap">
            <Icon size={16} aria-hidden />
            <Text fz="sm">
              <Text span fw={600} inherit>
                {title}
              </Text>{" "}
              <Text span tone="muted" inherit>
                · {text}
              </Text>
            </Text>
          </Group>
        ))}
      </Stack>
    </SimpleGrid>
  );
};

export default DoorOverview;
