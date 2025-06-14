"use client";

import { useState } from "react";
import {
  Card,
  Title,
  Text,
  Stack,
  Divider,
  Button,
  Pagination,
} from "@mantine/core";

const hives = [
  { id: 1, name: "Hive #1", location: "Backyard", status: "Active" },
  { id: 2, name: "Hive #2", location: "Orchard", status: "Swarmed" },
  { id: 3, name: "Hive #3", location: "Field", status: "Needs Inspection" },
  { id: 4, name: "Hive #4", location: "Garden", status: "Active" },
  { id: 5, name: "Hive #5", location: "Rooftop", status: "Inactive" },
  { id: 6, name: "Hive #6", location: "Backyard", status: "Swarmed" },
];

const ITEMS_PER_PAGE = 4;

export default function HivePage() {
  const [activePage, setPage] = useState(1);

  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const displayedHives = hives.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <main style={{ padding: "2rem" }}>
      <Title order={2} mb="md">
        Your Hives
      </Title>

      <Stack gap="md">
        {displayedHives.map((hive) => (
          <Card key={hive.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4}>{hive.name}</Title>
            <Text>Location: {hive.location}</Text>
            <Text>Status: {hive.status}</Text>
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
