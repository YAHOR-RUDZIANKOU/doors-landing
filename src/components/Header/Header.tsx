"use client";

import { useState, useEffect } from "react";
import { AppBar, Container, Group, Link, Stack, Text } from "@/ui-kit";
import ContactButton from "../ContactButton/ContactButton";
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar translucent={isScrolled}>
      <Container>
        <Group justify="space-between" h={80}>
          <HeaderNavigation />

          <Group gap="xl">
            <Stack gap={0}>
              <Link href="tel:+375445541004" tone="inverse" fz="xl" fw={700}>
                +375 (44) 554-10-04
              </Link>
              <Text tone="inverseMuted" fz="sm">
                ежедневно 9:00–20:00
              </Text>
            </Stack>

            <ContactButton
              title="Связаться со специалистом"
              variant="primary"
            />
          </Group>
        </Group>
      </Container>
    </AppBar>
  );
};

export default Header;
