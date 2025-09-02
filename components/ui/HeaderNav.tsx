// components/ui/HeaderNav.tsx
import {
  Box,
  Burger,
  Drawer,
  Group,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { navLinks } from "@/data/navLinks";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

type Props = {
  pathname: string;
  opened: boolean;
  toggle: () => void;
  close: () => void;
};

export default function HeaderNav({ pathname, opened, toggle, close }: Props) {
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
          <Text fw={700} fz="lg" c="white">
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
        <Stack gap="sm" pt="lg" style={{ flex: 1 }}>
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);

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
