// File: app/page.tsx (Home/Dashboard page)
"use client";
import FinanceWidget from "./components/widgets/FinanceWidget";
import {
  Card,
  Checkbox,
  Divider,
  Grid,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import dynamic from "next/dynamic";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useEffect, useState } from "react";
import QuickActionsWidget from "./components/widgets/QuickActionsWidget";

const TrapMapWidget = dynamic(
  () => import("./components/widgets/TrapMapWidget"),
  {
    ssr: false,
  }
);

const chartData = [
  { name: "Hive 1", harvest: 30 },
  { name: "Hive 2", harvest: 22 },
  { name: "Hive 3", harvest: 17 },
  { name: "Hive 4", harvest: 40 },
];

export default function HomePage() {
  const [hiveCount, setHiveCount] = useState<number>(0);
  const [swarmTrapCount, setSwarmTrapCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/hives");
      const data = await res.json();
      setHiveCount(Array.isArray(data) ? data.length : data.hives?.length ?? 0);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSwarmTraps = async () => {
      const res = await fetch("/api/swarm");
      const data = await res.json();
      setSwarmTrapCount(
        Array.isArray(data) ? data.length : data.traps?.length ?? 0
      );
    };
    fetchSwarmTraps();
  }, []);

  return (
    <main>
      <Title order={2} mx="md" mb="md">
        Welcome back, Mark 🐝
      </Title>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <FinanceWidget />
        </Grid.Col>
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
            <SimpleGrid cols={2} spacing="lg">
              <div>
                <Text fw={500}>Total Hives</Text>
                <Title order={3}>{hiveCount}</Title>
              </div>

              <div>
                <Text fw={500}>Swarms Traps Set</Text>
                <Title order={3}>{swarmTrapCount}</Title>
              </div>

              <div>
                <Text fw={500}>Some Other Stat Test</Text>
                <Title order={3}>XXXX</Title>
              </div>
            </SimpleGrid>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TrapMapWidget />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <QuickActionsWidget />
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
      </Grid>
    </main>
  );
}
