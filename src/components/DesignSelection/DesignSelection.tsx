import {
  Box,
  Card,
  Container,
  Group,
  Image,
  Section,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@/ui-kit";
import ContactButton from "../ContactButton/ContactButton";
import SketchIcon from "../SketchIcon/SketchIcon";
import { designCards } from "@/data/data";

export default function DesignSelection() {
  return (
    <Section pt={160}>
      <Container>
        <Stack gap="lg">
          <Title order={2}>Отделка, цвет и рисунок — на ваш выбор</Title>

          <Text tone="muted" fz="sm">
            Порошковая окраска, МДФ-панели с фрезеровкой, эмаль, зеркало внутри.
            8 цветов и любой оттенок по RAL под заказ.
          </Text>

          <SimpleGrid cols={designCards.length} spacing="sm">
            {designCards.map((card) => (
              <Stack key={card.id} gap="xs">
                <Card radius="xs" h={172}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={300}
                    height={400}
                  />
                </Card>

                <Box>
                  <Text fz="xs" fw={600}>
                    {card.title}
                  </Text>
                  <Text tone="muted" fz="xs">
                    {card.subtitle}
                  </Text>
                </Box>
              </Stack>
            ))}
          </SimpleGrid>

          <Card variant="outlined" radius="xs">
            <Group gap="lg" wrap="nowrap">
              <SketchIcon />

              <Box flex={1}>
                <Title order={3}>Можем сделать по вашему эскизу</Title>
                <Text tone="muted" fz="xs">
                  Рисунок фрезеровки, сочетание цветов, вставки — пришлите
                  набросок или фото, технолог скажет, что получится и сколько
                  стоит.
                </Text>
              </Box>

              <ContactButton
                title="Обсудить эскиз"
                variant="secondary"
                requestText="Дверь по моему эскизу - пришлю набросок после звонка"
              />
            </Group>
          </Card>
        </Stack>
      </Container>
    </Section>
  );
}
