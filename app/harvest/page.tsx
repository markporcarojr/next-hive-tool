"use client";

import {
  Badge,
  Button,
  Card,
  Group,
  Pagination,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

const harvests = [
  {
    id: 1,
    hive: "Hive #1",
    weight: 12.3,
    date: "2025-06-01",
    location: "Backyard",
  },
  {
    id: 2,
    hive: "Hive #2",
    weight: 10.8,
    date: "2025-05-28",
    location: "Field",
  },
  {
    id: 3,
    hive: "Hive #3",
    weight: 15.1,
    date: "2025-05-20",
    location: "Orchard",
  },
  {
    id: 4,
    hive: "Hive #4",
    weight: 8.6,
    date: "2025-05-15",
    location: "Garden",
  },
  {
    id: 5,
    hive: "Hive #5",
    weight: 11.2,
    date: "2025-05-10",
    location: "Rooftop",
  },
  {
    id: 6,
    hive: "Hive #6",
    weight: 9.7,
    date: "2025-05-05",
    location: "Backyard",
  },
];

const ITEMS_PER_PAGE = 4;

export default function HarvestPage() {
  const [activePage, setPage] = useState(1);

  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const displayed = harvests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <main style={{ padding: "2rem" }}>
      <Group justify="space-between" mb="md">
        <Title order={2}>Your Harvests</Title>
        <Button component={Link} href="/harvest/new">
          Add Harvest
        </Button>
      </Group>

      <Stack gap="md">
        {displayed.map((entry) => (
          <Card key={entry.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <Title order={4}>{entry.hive}</Title>
              <Badge color="honey" variant="light">
                {entry.date}
              </Badge>
            </Group>
            <Text>Weight: {entry.weight} lbs</Text>
            <Text>Location: {entry.location}</Text>
          </Card>
        ))}
      </Stack>

      <Pagination
        mt="xl"
        total={Math.ceil(harvests.length / ITEMS_PER_PAGE)}
        value={activePage}
        onChange={setPage}
        color="honey"
      />
    </main>
  );
}
