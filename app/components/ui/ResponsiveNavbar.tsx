"use client";

import {
  Burger,
  Drawer,
  Group,
  Stack,
  UnstyledButton,
  Text,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import classes from "./Navbar.module.css"; // optional styling

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/hives", label: "Hives" },
  { href: "/harvest", label: "Harvest" },
  { href: "/inspection", label: "Inspections" },
  { href: "/swarm", label: "Swarms" },
  { href: "/inventory", label: "Inventory" },
  { href: "/finance", label: "Finance" },
  { href: "/settings", label: "Settings" },
];

export default function ResponsiveNavbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top bar for mobile */}
      <Group
        justify="space-between"
        p="md"
        style={{ borderBottom: "1px solid #ccc" }}
        hiddenFrom="sm"
        w="100%"
      >
        <Group gap="xs">
          <Burger opened={opened} onClick={toggle} size="sm" />
          <Text fw={700}>Hive Tool</Text>
        </Group>
        <UserButton />
      </Group>

      <Drawer
        opened={opened}
        onClose={close}
        title="Navigation"
        hiddenFrom="sm"
      >
        <Stack>
          {links.map((link) => (
            <UnstyledButton
              component={Link}
              href={link.href}
              key={link.href}
              onClick={close}
              style={{
                fontWeight: pathname === link.href ? 600 : 400,
                color: pathname === link.href ? "#f0b429" : undefined,
              }}
            >
              {link.label}
            </UnstyledButton>
          ))}
        </Stack>
      </Drawer>

      {/* Sidebar for desktop */}
      <Box visibleFrom="sm">
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            <Group className={classes.header} justify="space-between">
              <Text fw={700}>Hive Tool</Text>
            </Group>
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.label}
                className={classes.link}
                data-active={pathname === link.href || undefined}
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
          <div className={classes.footer}>
            <UserButton />
          </div>
        </nav>
      </Box>
    </>
  );
}
