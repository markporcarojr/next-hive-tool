// app/page.tsx (your homepage/dashboard)
"use client";

import { Card, Grid, Text, Title } from "@mantine/core";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Hive A", harvest: 30 },
  { name: "Hive B", harvest: 22 },
  { name: "Hive C", harvest: 17 },
  { name: "Hive D", harvest: 40 },
];

export default function DashboardPage() {
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
              <BarChart data={data}>
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
      </Grid>
    </main>
  );
}
