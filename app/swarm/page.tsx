"use client";

import { SwarmInput } from "@/lib/schemas/swarmTrap";
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
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { TrapMap } from "../components/TrapMap";
// import { mockTraps } from "../data/mockTraps";
// import { Marker, Popup } from "react-leaflet";

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
  const [swarms, setSwarms] = useState<SwarmInput[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [modalOpen, { open, close }] = useDisclosure(false);
  const [swarmToDelete, setSwarmToDelete] = useState<number | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/swarm");
      const data = await res.json();
      setSwarms(data);
    };

    fetchData();
  }, []);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const displayed = swarms.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDelete = async () => {
    if (!swarmToDelete) return;

    const res = await fetch(`/api/swarm?id=${swarmToDelete}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setSwarms((prev) => prev.filter((s) => s.id !== swarmToDelete));
      close();
      setSwarmToDelete(null);
    } else {
      notifications.show({
        title: "Error",
        message: "Failed to delete swarm trap.",
        color: "red",
        icon: <IconX size={20} />,
        autoClose: 4000,
        withCloseButton: true,
      });
    }
    return (
      <main style={{ padding: "2rem" }}>
        <Title order={2} mb="md">
          Your Swarm Traps
        </Title>
        <Group justify="space-between" mb="md">
          <Button
            variant="filled"
            color="#f4b400"
            component={Link}
            href="/swarm/new"
          >
            Add Swarm Trap
          </Button>
        </Group>

        <Stack spacing="md">
          {displayed.map((trap) => (
            <Card key={trap.id} shadow="sm" padding="lg">
              <Group position="apart" mb="xs">
                <Text weight={500}>{trap.trapName}</Text>
                <Badge color={getBadgeColor(trap.status)}>{trap.status}</Badge>
              </Group>
              <Text size="sm" color="dimmed">
                Location: {trap.location}
              </Text>
              <Text size="sm" color="dimmed">
                Last Checked: {new Date(trap.lastChecked).toLocaleDateString()}
              </Text>
              <Divider my="sm" />
              <Group position="apart" mt="md">
                <Text size="sm" color="dimmed">
                  Notes: {trap.notes || "No notes provided."}
                </Text>
                <Button
                  variant="light"
                  size="xs"
                  onClick={() => {
                    setSwarmToDelete(trap.id!);
                    open();
                  }}
                >
                  Delete
                </Button>
              </Group>
            </Card>
          ))}
        </Stack>
        <Pagination
          mt="xl"
          total={Math.ceil(swarms.length / ITEMS_PER_PAGE)}
          value={activePage}
          onChange={setPage}
          color="honey"
        />

        {/* Modal for deletion confirmation */}
        {modalOpen && (
          <div>
            <Title order={3}>Confirm Deletion</Title>
            <Text>Are you sure you want to delete this swarm trap?</Text>
            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={close}>
                Cancel
              </Button>
              <Button color="red" onClick={handleDelete}>
                Delete
              </Button>
            </Group>
          </div>
        )}
      </main>
    );
  };
}
