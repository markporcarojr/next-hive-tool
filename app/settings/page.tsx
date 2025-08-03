"use client";

import {
  Button,
  Container,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../../components/ThemeToggle";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setDarkMode(data.darkMode ?? false);
          setAddress(data.address ?? "");
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ darkMode, address }),
      });

      if (res.ok) {
        notifications.show({
          title: "Settings saved",
          message: "Your preferences have been updated.",
          color: "green",
        });
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      console.error(err);
      notifications.show({
        title: "Error",
        message: "Could not save your settings.",
        color: "red",
      });
    }
  };

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <Container>
      <Title order={1} mb="sm">
        Settings
      </Title>
      <Text c="dimmed" mb="xl">
        Customize your Hive Tool preferences.
      </Text>

      <Paper withBorder p="md" radius="md" mb="xl">
        <Title order={3} mb="sm">
          Hive Location
        </Title>
        <Stack>
          <TextInput
            label="Hive Address"
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
          />
        </Stack>
      </Paper>

      <Paper withBorder p="md" radius="md" mb="xl">
        <Group justify="space-between">
          <div>
            <Text fw={500}>Dark Mode</Text>
            <Text size="sm" c="dimmed">
              Toggle the app’s color scheme preference.
            </Text>
          </div>
          <ThemeToggle />
        </Group>
      </Paper>

      <Button onClick={handleSave}>Save Settings</Button>
    </Container>
  );
}
