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
  Image,
} from "@mantine/core";
import { TrapMap } from "../components/TrapMap";
import { mockTraps } from "../data/mockTraps";
import { Marker, Popup } from "react-leaflet";

const swarms = [
  {
    id: 1,
    location: "Oak Grove Tree Line",
    date: "2025-06-01",
    status: "Swarm Caught",
    note: "Strong colony, moved to Hive #7",
    imageUrl: "/images/swarms/oak-grove.jpeg",
  },
  {
    id: 2,
    location: "Tool Shed Roof",
    date: "2025-05-28",
    status: "Active",
    note: "Checked recently, still empty.",
    imageUrl: "/images/swarms/shed.jpg",
  },
  {
    id: 3,
    location: "Neighbor’s Maple",
    date: "2025-05-20",
    status: "Inactive",
    note: "No scout activity for over 10 days.",
    imageUrl: "/images/swarms/maple.jpg",
  },
  {
    id: 4,
    location: "Barn Eaves",
    date: "2025-05-15",
    status: "Swarm Caught",
    note: "Caught and hived on 5/16.",
    imageUrl: "/images/swarms/barn.jpg",
  },
  {
    id: 5,
    location: "Backyard Walnut Tree",
    date: "2025-05-10",
    status: "Active",
    note: "Scouts observed daily.",
    imageUrl: "/images/swarms/walnut.jpg",
  },
];

const ITEMS_PER_PAGE = 4;

function getBadgeColor(status: string) {
  switch (status) {
    case "Swarm Caught":
      return "green";
    case "Active":
      return "yellow";
    case "Inactive":
      return "gray";
    default:
      return "blue";
  }
}

export default function SwarmPage() {
  const [page, setPage] = useState(1);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const displayed = swarms.slice(start, start + ITEMS_PER_PAGE);

  return (
    <main style={{ padding: "2rem" }}>
      <Title order={2} mb="md">
        Swarm Traps
      </Title>
      {/* <TrapMap /> */}
      <Stack gap="md">
        {displayed.map((swarm) => (
          <Card key={swarm.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <Title order={4}>{swarm.location}</Title>
              <Badge color={getBadgeColor(swarm.status)}>{swarm.status}</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              Set: {swarm.date}
            </Text>

            <Divider my="sm" />

            <Image
              src={swarm.imageUrl}
              alt={swarm.location}
              radius="md"
              height={160}
              fit="cover"
              width="100%"
            />

            <Text mt="sm">{swarm.note}</Text>
          </Card>
        ))}
      </Stack>

      <Pagination
        mt="xl"
        total={Math.ceil(swarms.length / ITEMS_PER_PAGE)}
        value={page}
        onChange={setPage}
        color="honey"
      />
    </main>
  );
}
