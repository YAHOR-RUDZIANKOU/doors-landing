import { Breadcrumbs, Container, Link, Stack, Text, Title } from "@/ui-kit";
import { PAGE_TITLES, ROUTES } from "@/navigation";
import classes from "./CatalogHero.module.css";

type CatalogHeroProps = {
  title: string;
  subtitle: string;
};

/** Тёмная шапка каталога с фоном-сеткой. */
const CatalogHero = ({ title, subtitle }: CatalogHeroProps) => {
  return (
    <div className={classes.hero}>
      <Container>
        <Stack align="flex-start">
          <Breadcrumbs aria-label="Хлебные крошки">
            <Link href={ROUTES.home}>{PAGE_TITLES.home}</Link>
            <Link href={ROUTES.catalog}>{PAGE_TITLES.catalog}</Link>
            <Text span tone="inverse" aria-current="page">
              {title}
            </Text>
          </Breadcrumbs>

          <Title order={1} tone="inverse">
            {title}
          </Title>

          <Text tone="inverseMuted" fz="lg">
            {subtitle}
          </Text>
        </Stack>
      </Container>
    </div>
  );
};

export default CatalogHero;
