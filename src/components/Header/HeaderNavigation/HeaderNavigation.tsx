"use client";

import { usePathname } from "next/navigation";
import { Group, Link } from "@/ui-kit";
import { PAGE_TITLES, ROUTES } from "@/navigation";
import LogoIcon from "@/components/LogoIcon/LogoIcon";
import NavLink from "../NavLink/NavLink";

const navLinks = [
  { href: ROUTES.catalog, label: PAGE_TITLES.catalog },
  { href: ROUTES.contacts, label: PAGE_TITLES.contacts },
];

const HeaderNavigation = () => {
  const pathname = usePathname();

  return (
    <Group gap="xl">
      <Link href={ROUTES.home} tone="inverse" fz="xl" fw={700}>
        <Group gap="sm">
          <LogoIcon />
          СТАЛЬНАЯ ЛИНИЯ
        </Group>
      </Link>

      <Group component="nav" gap="xl">
        {navLinks.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            isActive={pathname === link.href}
          />
        ))}
      </Group>
    </Group>
  );
};

export default HeaderNavigation;
