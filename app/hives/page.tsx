"use client";

import { useEffect, useState } from "react";
import { Card, Title, Text, Divider, Button, Group } from "@mantine/core";
import Link from "next/link";
import { HiveInput } from "@/lib/schemas/hive";
import { PaginatedList } from "../components/PaginatedList";

export default function HivePage() {
  const [hives, setHives] = useState<HiveInput[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/hives");
      const data = await res.json();
      setHives(data);
    };
    fetchData();
  }, []);

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

      <PaginatedList
        data={hives}
        itemsPerPage={4}
        renderItem={(hive) => (
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
        )}
      />
    </main>
  );
}
