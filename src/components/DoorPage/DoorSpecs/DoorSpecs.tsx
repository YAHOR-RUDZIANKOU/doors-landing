import {
  Container,
  Group,
  Section,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@/ui-kit";
import type { EntranceDoor } from "@/data/data";
import { getDoorSeries, getSpecGroups } from "@/utils/doorUtils";

type DoorSpecsProps = {
  door: EntranceDoor;
};

const DoorSpecs = ({ door }: DoorSpecsProps) => {
  // Пока у дверей нет description, под заголовком выводим назначение серии.
  const purpose = getDoorSeries(door)?.purpose;

  return (
    <Section id="specs">
      <Container>
        <Stack gap="xl">
          <Stack gap="sm">
            <Title order={2} fw={700}>
              Характеристики
            </Title>
            {purpose && (
              <Text tone="muted" maw={600}>
                {purpose[0].toUpperCase() + purpose.slice(1)}
              </Text>
            )}
          </Stack>

          <SimpleGrid cols={2} spacing={48} verticalSpacing="xl">
            {getSpecGroups(door).map((group) => (
              <Stack key={group.title} gap={0}>
                <Text fz="md" pb="xs">
                  {group.title}
                </Text>
                {group.rows.map(([label, value]) => (
                  <Group
                    key={label}
                    justify="space-between"
                    wrap="nowrap"
                    py="sm"
                    style={{
                      borderBottom: "1px solid var(--mantine-color-ink-2)",
                    }}
                  >
                    <Text tone="muted" fz="sm">
                      {label}
                    </Text>
                    <Text fz="sm" fw={600} ta="right">
                      {value}
                    </Text>
                  </Group>
                ))}
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Section>
  );
};

export default DoorSpecs;
