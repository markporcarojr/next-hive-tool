"use client";

import { InspectionWithHive } from "@/lib/schemas/inspection";
import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Pagination,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 4;

export default function InspectionPage() {
  const [inspections, setInspections] = useState<InspectionWithHive[]>([]);

  const [page, setPage] = useState(1);

  const start = (page - 1) * ITEMS_PER_PAGE;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/inspection");
      const data = await res.json();
      setInspections(data);
    };
    fetchData();
  }, []);

  const displayed = inspections.slice(start, start + ITEMS_PER_PAGE);

  return (
    <main style={{ padding: "2rem" }}>
      <Group justify="space-between" mb="md">
        <Title order={2}>Inspection Log</Title>
        <Button
          variant="filled"
          color="#f4b400"
          component={Link}
          href="/inspection/new"
        >
          Add Inspection
        </Button>
      </Group>

      <Stack gap="md">
        {displayed.map((entry) => (
          <Card
            key={entry.hiveId}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <Group justify="space-between">
              <Title order={4}>Hive #{entry.hive.hiveNumber}</Title>
              <Badge>
                {new Date(entry.inspectionDate).toLocaleDateString()}
              </Badge>
            </Group>
            <Text size="sm" c="dimmed">
              Temperament: {entry.temperament}
            </Text>
            <Text size="sm" c="dimmed">
              Hive Strength: {entry.hiveStrength}
            </Text>
            <Text size="sm" mt="xs">
              Notes: {entry.inspectionNote || "No notes provided"}
            </Text>
            <Divider my="sm" />
            <Group justify="flex-end">
              <Button
                size="xs"
                variant="light"
                component={Link}
                href={`/inspection/edit/${entry.id}`}
              >
                Edit
              </Button>
            </Group>
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
