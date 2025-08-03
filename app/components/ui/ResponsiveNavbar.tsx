"use client";

import { UserButton } from "@clerk/nextjs";
import {
  Box,
  Burger,
  Drawer,
  Group,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./Navbar.module.css";
import { navLinks } from "@/app/data/navLinks";

export default function ResponsiveNavbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  return (
    <>
      {/* Top bar for mobile */}
      <Group
        justify="space-between"
        p="md"
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          borderBottom: "1px solid #ccc",
          backgroundColor: "var(--color-amber)",
          color: "var(--color-black)",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}
        hiddenFrom="sm"
      >
        <Group gap="xs">
          <Burger color="black" opened={opened} onClick={toggle} size="sm" />
        </Group>
        <Text c="black" fw={700} fz="xl">
          Hive Tool
        </Text>
        <UserButton />
      </Group>
      {/* ✅ Spacer added right after fixed nav */}
      <Box hiddenFrom="sm" h={64} />
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
          {navLinks.map((link) => {
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
