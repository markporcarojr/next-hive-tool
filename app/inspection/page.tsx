"use client";

import { useState } from "react";
import {
  Card,
  Title,
  Text,
  Stack,
  Badge,
  Pagination,
  Group,
  Divider,
} from "@mantine/core";

const inspections = [
  {
    id: 1,
    hive: "Hive #1",
    date: "2025-06-06",
    notes: "Queen active, brood pattern strong.",
    health: "Healthy",
  },
  {
    id: 2,
    hive: "Hive #2",
    date: "2025-06-04",
    notes: "Hive overcrowded, consider adding super.",
    health: "Warning",
  },
  {
    id: 3,
    hive: "Hive #3",
    date: "2025-06-01",
    notes: "Signs of mites, beginning treatment.",
    health: "Alert",
  },
  {
    id: 4,
    hive: "Hive #4",
    date: "2025-05-30",
    notes: "Queen not found, check again soon.",
    health: "Warning",
  },
  {
    id: 5,
    hive: "Hive #5",
    date: "2025-05-25",
    notes: "Added new frames, bees drawing comb.",
    health: "Healthy",
  },
];

const ITEMS_PER_PAGE = 4;

function getBadgeColor(status: string) {
  switch (status) {
    case "Healthy":
      return "green";
    case "Warning":
      return "yellow";
    case "Alert":
      return "red";
    default:
      return "gray";
  }
}

export default function InspectionPage() {
  const [page, setPage] = useState(1);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const displayed = inspections.slice(start, start + ITEMS_PER_PAGE);

  return (
    <main style={{ padding: "2rem" }}>
      <Title order={2} mb="md">
        Inspection Logs
      </Title>

      <Stack gap="md">
        {displayed.map((entry) => (
          <Card key={entry.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <Title order={4}>{entry.hive}</Title>
              <Badge color={getBadgeColor(entry.health)}>{entry.health}</Badge>
            </Group>
            <Text size="sm" c="dimmed">
              {entry.date}
            </Text>
            <Divider my="sm" />
            <Text>{entry.notes}</Text>
          </Card>
        ))}
      </Stack>

      <Pagination
        mt="xl"
        total={Math.ceil(inspections.length / ITEMS_PER_PAGE)}
        value={page}
        onChange={setPage}
        color="honey"
      />
    </main>
  );
}
