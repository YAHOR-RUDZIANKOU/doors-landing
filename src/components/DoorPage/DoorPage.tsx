import { Stack, Container, Breadcrumbs, Link, Text, Section } from "@/ui-kit";
import type { Door } from "@/data/data";
import { PAGE_TITLES, ROUTES } from "@/navigation";
import DoorOverview from "./DoorOverview/DoorOverview";
import DoorSpecs from "./DoorSpecs/DoorSpecs";

type DoorPageProps = {
  currentDoor: Door;
};

const DoorPage = ({ currentDoor }: DoorPageProps) => {
  return (
    <>
      <Section pt={100}>
        <Container>
          <Stack gap={25}>
            <Breadcrumbs aria-label="Хлебные крошки" c="ink.6" fs="sm">
              <Link href={ROUTES.home}>{PAGE_TITLES.home}</Link>
              <Link href={ROUTES.catalog}>
                {currentDoor.kind === "entrance"
                  ? "Входные двери"
                  : "Межкомнатные двери"}
              </Link>
              <Text span aria-current="page">
                {currentDoor.name}
              </Text>
            </Breadcrumbs>

            <DoorOverview door={currentDoor} />
          </Stack>
        </Container>
      </Section>

      {currentDoor.kind === "entrance" && <DoorSpecs door={currentDoor} />}
    </>
  );
};

export default DoorPage;
