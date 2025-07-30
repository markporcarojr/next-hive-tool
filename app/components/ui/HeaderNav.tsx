"use client";

import {
  Burger,
  Group,
  Text,
  Box,
  Drawer,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import links from "@data/navLinks"; // Assuming you have a separate file for links

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/hives", label: "Hives" },
  { href: "/harvest", label: "Harvest" },
  { href: "/inspection", label: "Inspections" },
  { href: "/swarm", label: "Swarms" },
  { href: "/inventory", label: "Inventory" },
  { href: "/finance/", label: "Finance" },
  { href: "/settings", label: "Settings" },
];

export default function HeaderNav() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  return (
    <Box
      hiddenFrom="sm"
      component="header"
      px="md"
      py="xs"
      className="mb-30"
      style={{
        borderBottom: "1px solid #ccc",
        backgroundColor: "var(--color-amber)",
        color: "var(--color-black)",
      }}
    >
      <Group justify="space-between">
        <Burger opened={opened} onClick={toggle} size="sm" color="black" />
        <Text c="black" fw={700} fz="xl">
          Hive Tool
        </Text>
        <UserButton />
      </Group>
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Text fw={700} fz="lg" c="black">
            Hive Tool
          </Text>
        }
        hiddenFrom="sm"
        padding="md"
        styles={{
          body: { display: "flex", flexDirection: "column", height: "100%" },
        }}
        overlayProps={{ opacity: 0.55, blur: 4 }}
        radius="md"
        size="xs"
      >
        <Stack gap="sm" pt={"lg"} style={{ flex: 1 }}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <UnstyledButton
                component={Link}
                href={link.href}
                key={link.href}
                onClick={close}
                style={{
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#f0b429" : "#FFF",
                  padding: "14px 20px",
                  borderRadius: 10,
                  background: isActive
                    ? "rgba(240, 180, 41, 0.15)"
                    : "transparent",
                  transition: "all 0.2s ease",
                  fontSize: "1rem",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isActive
                    ? "rgba(240, 180, 41, 0.2)"
                    : "rgba(0, 0, 0, 0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isActive
                    ? "rgba(240, 180, 41, 0.15)"
                    : "transparent";
                }}
              >
                {link.label}
              </UnstyledButton>
            );
          })}
        </Stack>
        <Box
          mt="xl"
          style={{
            textAlign: "center",
            paddingTop: 12,
            borderTop: "1px solid #eee",
          }}
        >
          <Text c="dimmed" fz="xs" fw={500}>
            Hive Tool <sup>™</sup>
          </Text>
        </Box>
      </Drawer>
    </Box>
  );
}
