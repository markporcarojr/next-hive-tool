"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <Select
          onValueChange={(value) => {
            if (value === "inspection") handleAddInspection();
            else if (value === "hive") handleAddHive();
            else if (value === "swarm") handleAddSwarm();
            else if (value === "harvest") handleAddHarvest();
            else if (value === "inventory") handleAddInventory();
            else if (value === "settings") handleSettings();
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inspection">Add Inspection</SelectItem>
            <SelectItem value="hive">Add Hive</SelectItem>
            <SelectItem value="swarm">Add Swarm</SelectItem>
            <SelectItem value="harvest">Add Harvest</SelectItem>
            <SelectItem value="inventory">Add Inventory</SelectItem>
            <SelectItem value="settings">Settings</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default QuickActionsWidget;
