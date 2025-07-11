"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Title,
  Text,
  Stack,
  Badge,
  Pagination,
  Group,
  Divider,
  Button,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import { SwarmInput } from "@/lib/schemas/swarmTrap";

const ITEMS_PER_PAGE = 4;

export default function SwarmPage() {
  const [swarms, setSwarms] = useState<SwarmInput[]>([]);
  const [page, setPage] = useState(1);
  const [swarmToDelete, setSwarmToDelete] = useState<number | null>(null);
  const [modalOpen, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchSwarms = async () => {
      const res = await fetch("/api/swarm");
      const data = await res.json();
      setSwarms(data);
    };
    fetchSwarms();
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
      });
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <Group justify="space-between" mb="md">
        <Title order={2}>Swarm Traps</Title>
        <Button
          component={Link}
          href="/swarm/new"
          color="yellow"
          variant="filled"
        >
          Add Swarm Trap
        </Button>
      </Group>

      <Stack gap="md">
        {displayed.map((trap) => (
          <Card key={trap.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>Trap #{trap.id}</Text>
              <Badge color="green">Active</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              Location: {trap.location}
            </Text>

            <Text size="sm" c="dimmed">
              Installed: {new Date(trap.installedAt).toLocaleDateString()}
            </Text>

            {trap.removedAt && (
              <Text size="sm" c="dimmed">
                Removed: {new Date(trap.removedAt).toLocaleDateString()}
              </Text>
            )}

            <Divider my="sm" />

            <Group justify="space-between" mt="md">
              <Text size="sm" c="dimmed" style={{ flex: 1 }}>
                Notes: {trap.notes || "No notes provided."}
              </Text>
              <Divider my="sm" />
              <Button
                variant="light"
                size="xs"
                component={Link}
                href={`/swarm/edit/${trap.id}`}
              >
                Edit
              </Button>
              <Button
                variant="light"
                size="xs"
                color="red"
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
        value={page}
        onChange={setPage}
        color="honey"
      />

      <Modal
        opened={modalOpen}
        onClose={() => {
          close();
          setSwarmToDelete(null);
        }}
        title="Confirm Deletion"
        centered
      >
        <Text mb="md">Are you sure you want to delete this swarm trap?</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Confirm Delete
          </Button>
        </Group>
      </Modal>
    </main>
  );
}
