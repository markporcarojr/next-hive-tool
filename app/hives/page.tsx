"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Title,
  Text,
  Stack,
  Divider,
  Button,
  Pagination,
  Group,
} from "@mantine/core";
import Link from "next/link";
import { HiveInput } from "@/lib/schemas/hive";

const ITEMS_PER_PAGE = 4;

export default function HivePage() {
  const [hives, setHives] = useState<HiveInput[]>([]);
  const [activePage, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/hives");
      const data = await res.json();
      setHives(data);
    };
    fetchData();
  }, []);

  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const displayedHives = hives.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <main style={{ padding: "2rem" }}>
      <Group justify="space-between" mb="md">
        <Title order={2}>Your Hives</Title>
        <Button
          variant="filled"
          color="#f4b400"
          component={Link}
          href="/hives/new"
        >
          Add Hive
        </Button>
      </Group>

      <Stack gap="md">
        {displayedHives.map((hive) => (
          <Card
            key={hive.hiveNumber}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <Title order={4}>{hive.hiveNumber}</Title>
            <Text>Queen Color {hive.queenColor}</Text>
            <Text>Status: {hive.hiveStrength}</Text>
            <Text>Todo: {hive.todo}</Text>
            <Divider my="sm" />
            <Button variant="light" color="honey">
              View Details
            </Button>
          </Card>
        ))}
      </Stack>

      <Pagination
        mt="xl"
        total={Math.ceil(hives.length / ITEMS_PER_PAGE)}
        value={activePage}
        onChange={setPage}
        color="honey"
      />
    </main>
  );
}
