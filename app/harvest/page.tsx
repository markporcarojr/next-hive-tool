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
  Modal,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";

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
  const [modalOpen, { open, close }] = useDisclosure(false);
  const [harvestToDelete, setHarvestToDelete] = useState<number | null>(null);

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
  const handleDelete = async () => {
    if (!harvestToDelete) return;

    const res = await fetch(`/api/harvest?id=${harvestToDelete}`, {
      method: "DELETE",
    });

    if (res.ok) {
      notifications.show({
        title: "Deleted",
        message: "Your harvest record was removed.",
        color: "teal",
        icon: <IconCheck size={18} />,
        autoClose: 3000,
        withCloseButton: false,
      });
      close();
      window.location.reload(); // You can use state instead later
    } else {
      notifications.show({
        title: "Error",
        message: "Could not delete harvest.",
        color: "red",
        icon: <IconX size={18} />,
        autoClose: 5000,
      });
    }
  };

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
              <Button
                variant="light"
                size="xs"
                component={Link}
                href={`/harvest/edit/${entry.id}`}
              >
                Edit
              </Button>
              <Button
                color="red"
                variant="light"
                size="xs"
                onClick={() => {
                  setHarvestToDelete(entry.id);
                  open();
                }}
              >
                Delete
              </Button>
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
      <Modal
        opened={modalOpen}
        onClose={close}
        title="Confirm Deletion"
        centered
      >
        <Text mb="md">
          Are you sure you want to delete this harvest record?
        </Text>
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
