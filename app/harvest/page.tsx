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
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 4;

type Harvest = {
  id: number;
  harvestType: string;
  harvestAmount: number;
  harvestDate: string;
};

export default function HarvestPage() {
  const [harvests, setHarvests] = useState<Harvest[]>([]);
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/harvest");
      const data = await res.json();
      setHarvests(data);
    };

    fetchData();
  }, []);

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
              <Title order={4}>{entry.harvestType}</Title>
              <Badge color="honey" variant="light">
                {new Date(entry.harvestDate).toLocaleDateString()}
              </Badge>
            </Group>
            <Text>Amount: {entry.harvestAmount} lbs</Text>
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
