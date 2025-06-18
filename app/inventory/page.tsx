"use client";

import {
  ActionIcon,
  Box,
  Button,
  Container,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconPlus, IconTrash, IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function InventoryPage() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Brood Frames", count: 500 },
    { id: 2, name: "Smoker Fuel", count: 12 },
    { id: 3, name: "Hive Tool", count: 4 },
    { id: 4, name: "Bee Suit", count: 2 },
    { id: 5, name: "Queen Excluders", count: 6 },
    { id: 6, name: "Bee Brush", count: 3 },
    { id: 7, name: "Bottom Boards", count: 10 },
    { id: 8, name: "Deep Hive Bodies", count: 8 },
    { id: 9, name: "Medium Supers", count: 14 },
    { id: 10, name: "Top Covers", count: 10 },
    { id: 11, name: "Feeder Pails", count: 7 },
    { id: 12, name: "Entrance Reducers", count: 15 },
    { id: 13, name: "Queen Catchers", count: 5 },
    { id: 14, name: "Nuc Boxes", count: 9 },
    { id: 15, name: "Wax Foundation Sheets", count: 300 },
  ]);

  const [opened, setOpened] = useState(false);
  const [newItem, setNewItem] = useState("");

  const handleAdd = () => {
    if (!newItem.trim()) return;
    const item = { id: Date.now(), name: newItem.trim() };
    setInventory((prev) => [...prev, item]);
    setNewItem("");
    setOpened(false);
  };

  const handleDelete = (id: number) => {
    const deletedItem = inventory.find((item) => item.id === id);
    setInventory((prev) => prev.filter((item) => item.id !== id));

    showNotification({
      title: "Item Deleted",
      message: `"${deletedItem?.name}" was removed from inventory.`,
      color: "red",
      icon: <IconX size={16} />,
    });
  };

  return (
    <Container>
      <Group justify="space-between" mb="md">
        <div>
          <Title order={1}>Inventory</Title>
          <Text c="dimmed" size="sm">
            Manage your equipment and tools below.
          </Text>
        </div>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => setOpened(true)}
        >
          Add Item
        </Button>
      </Group>

      <Box component="section" mt="lg">
        {inventory.length > 0 ? (
          <Stack spacing="sm">
            {inventory.map((item) => (
              <Box
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "8px",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <Group gap="xs">
                  <Text fw={600}>{item.name}</Text>
                  <Text c="dimmed">({item.count})</Text>
                </Group>

                <ActionIcon
                  variant="light"
                  color="red"
                  onClick={() => handleDelete(item.id)}
                  aria-label={`Delete ${item.name}`}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Box>
            ))}
          </Stack>
        ) : (
          <Text c="dimmed">Your inventory is empty.</Text>
        )}
      </Box>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Inventory Item"
        centered
      >
        <TextInput
          placeholder="e.g., Queen Catcher"
          label="Item Name"
          value={newItem}
          onChange={(e) => setNewItem(e.currentTarget.value)}
          withAsterisk
        />
        <Group justify="flex-end" mt="md">
          <Button onClick={handleAdd}>Add</Button>
        </Group>
      </Modal>
    </Container>
  );
}
