"use client";

import { HiveInput } from "@/lib/schemas/hive";
import { Button, Card, Divider, Modal, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PaginatedList } from "../components/PaginatedList";

export default function HivePage() {
  const [hives, setHives] = useState<HiveInput[]>([]);
  const [hiveToDelete, setHiveToDelete] = useState<number | null>(null);
  const [modalOpen, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/hives");
      const data = await res.json();
      setHives(data);
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!hiveToDelete) return;

    const res = await fetch(`/api/hives?id=${hiveToDelete}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setHives((prev) => prev.filter((h) => h.id !== hiveToDelete));
      close();
      setHiveToDelete(null);
    } else {
      notifications.show({
        title: "Error",
        message: "Failed to delete hive record.",
        color: "red",
        icon: <IconX size={20} />,
        autoClose: 4000,
        withCloseButton: true,
      });
    }
  };

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
            <Button
              variant="light"
              size="xs"
              component={Link}
              href={`/hives/edit/${hive.id}`}
            >
              Edit
            </Button>
            <Button
              color="red"
              variant="light"
              size="xs"
              onClick={() => {
                setHiveToDelete(hive.id!);
                open();
              }}
            >
              Delete
            </Button>
          </Card>
        )}
      />
      <Modal
        opened={modalOpen}
        onClose={() => {
          close();
          setHiveToDelete(null);
        }}
        title="Confirm Deletion"
        centered
      >
        <Text mb="md">Are you sure you want to delete this record?</Text>
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
