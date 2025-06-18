"use client";

import {
  Container,
  Title,
  Text,
  Divider,
  Switch,
  Group,
  Stack,
  TextInput,
  Button,
  Paper,
} from "@mantine/core";
import { useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [username, setUsername] = useState("beekeeper123");
  const [email, setEmail] = useState("beekeeper@example.com");

  const handleSave = () => {
    console.log("Saved settings:", { username, email, darkMode });
    // future: toast, save to DB, etc.
  };

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
          Profile
        </Title>
        <Stack>
          <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <TextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
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
          <Switch
            checked={darkMode}
            onChange={(e) => setDarkMode(e.currentTarget.checked)}
          />
        </Group>
      </Paper>

      <Button onClick={handleSave}>Save Settings</Button>
    </Container>
  );
}
