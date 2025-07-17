"use client";

import { useForm } from "@mantine/form";
import { inventorySchema, InventoryInput } from "@/lib/schemas/inventory";
import { zodResolver } from "mantine-form-zod-resolver";
import {
  Button,
  TextInput,
  NumberInput,
  Stack,
  Select,
  Title,
} from "@mantine/core";
import { useRouter } from "next/navigation";

const LOCATIONS = ["Storage", "Shop", "Garage", "Field", "Other"];

export default function NewInventoryPage() {
  const router = useRouter();
  const form = useForm<InventoryInput>({
    validate: zodResolver(inventorySchema),
    initialValues: {
      name: "",
      quantity: 0,
      location: "",
    },
  });

  const handleSubmit = async (values: InventoryInput) => {
    const res = await fetch("/api/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) router.push("/inventory");
    else alert("Failed to save inventory item");
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Title order={2}>Add Inventory Item</Title>
        <TextInput label="Item Name" required {...form.getInputProps("name")} />
        <NumberInput
          label="Quantity"
          required
          {...form.getInputProps("quantity")}
          min={0}
        />
        <Select
          label="Location"
          placeholder="Choose a location"
          data={LOCATIONS}
          required
          {...form.getInputProps("location")}
        />
        <Button type="submit" color="yellow">
          Save Item
        </Button>
      </Stack>
    </form>
  );
}
