// app/components/DashboardClient.tsx
"use client";

import FinanceWidget from "../widgets/FinanceWidget";
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
import QuickActionsWidget from "../widgets/QuickActionsWidget";
import { FinanceSummary } from "@/lib/types/finance";

const TrapMapWidget = dynamic(() => import("../widgets/TrapMapWidget"), {
  ssr: false,
});

const chartData = [
  { name: "Hive 1", harvest: 30 },
  { name: "Hive 2", harvest: 22 },
  { name: "Hive 3", harvest: 17 },
  { name: "Hive 4", harvest: 40 },
];

export default function DashboardClient({
  hiveCount,
  swarmTrapCount,
  financeSummary,
}: {
  hiveCount: number;
  swarmTrapCount: number;
  financeSummary: FinanceSummary;
}) {
  return (
    <main>
      <Title order={2} mx="md" mb="md">
        Welcome back, Mark 🐝
      </Title>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4}>To-Do List</Title>
            <Divider my="sm" />
            <Stack>
              <Checkbox label="Organize file structure" defaultChecked />
              <Checkbox label="Refactor all Widgets" />
              <Checkbox label="Build a reuseable form" />
              <Checkbox label="Separate all client and server logic" />
              <Checkbox label="Make all forms and ui follow the same design" />
              <Checkbox label="Paganate all pages the same way" />
              <Checkbox label="Make button components reusable" />
              <Checkbox label="Update the color palette" />
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <FinanceWidget financeSummary={financeSummary} />
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
          <QuickActionsWidget />
        </Grid.Col>

        <Grid.Col span={12}>
          <TrapMapWidget />
        </Grid.Col>
      </Grid>
    </main>
  );
}
