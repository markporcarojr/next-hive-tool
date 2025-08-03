"use client";

import { Card, Group, Select, Title } from "@mantine/core";
import { useRouter } from "next/navigation";

const QuickActionsWidget = () => {
  const router = useRouter();

  // Example handlers for actions

  const handleAddHarvest = () => {
    router.push("/harvest/new");
  };

  const handleAddHive = () => {
    router.push("/hives/new");
  };

  const handleAddInspection = () => {
    router.push("/inspection/new");
  };

  const handleAddInventory = () => {
    router.push("/inventory/new");
  };

  const handleAddSwarm = () => {
    router.push("/swarm/new");
  };
  const handleSettings = () => {
    router.push("/settings");
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={4}>Quick Actions</Title>
      <Group mt="md">
        <Select
          placeholder="Select action"
          data={[
            { value: "inspection", label: "Add Inspection" },
            { value: "hive", label: "Add Hive" },
            { value: "swarm", label: "Add Swarm" },
            { value: "harvest", label: "Add Harvest" },
            { value: "inventory", label: "Add Inventory" },
            { value: "settings", label: "Settings" },
          ]}
          onChange={(value) => {
            if (value === "inspection") handleAddInspection();
            else if (value === "hive") handleAddHive();
            else if (value === "swarm") handleAddSwarm();
            else if (value === "harvest") handleAddHarvest();
            else if (value === "inventory") handleAddInventory();
            else if (value === "settings") handleSettings();
          }}
        />
      </Group>
    </Card>
  );
};

export default QuickActionsWidget;
