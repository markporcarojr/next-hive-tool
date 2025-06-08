// File: app/page.tsx (Home/Dashboard page)
"use client";

import {
  Card,
  Checkbox,
  Divider,
  Grid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { name: "Hive 1", harvest: 30 },
  { name: "Hive 2", harvest: 22 },
  { name: "Hive 3", harvest: 17 },
  { name: "Hive 4", harvest: 40 },
];

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <Title order={2} mb="md">
        Welcome back, Mark 🐝
      </Title>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw={500} mb="xs">
              Harvest Summary
            </Text>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="harvest" fill="#f4b400" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw={500}>Total Hives</Text>
            <Title order={3}>12</Title>

            <Text fw={500} mt="md">
              Swarms This Season
            </Text>
            <Title order={3}>2</Title>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4}>To-Do List</Title>
            <Divider my="sm" />
            <Stack>
              <Checkbox label="Inspect Hive #12" />
              <Checkbox label="Harvest honey from Hive #7" />
              <Checkbox label="Refill smoker fuel" defaultChecked />
              <Checkbox label="Update queen status" />
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4}>Recent Inspections</Title>
            <Divider my="sm" />
            <Stack spacing="xs">
              <Text size="sm">Hive #3 – 2025-06-06: Brood pattern strong</Text>
              <Text size="sm">Hive #8 – 2025-06-05: Needs new super</Text>
              <Text size="sm">Hive #1 – 2025-06-04: Queen spotted, marked</Text>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </main>
  );
}
