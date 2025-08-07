// app/inventory/edit/[id]/page.tsx
"use client";

import { InventoryInput, inventorySchema } from "@/lib/schemas/inventory";
import {
  Button,
  Loader,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { showNotification } from "@/lib/notifications";

const locations = ["Workshop", "Honey Room", "Storage Shed", "Garage", "Van"];

export default function EditInventoryPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const form = useForm<InventoryInput>({
    validate: zodResolver(inventorySchema),
    initialValues: {
      name: "",
      quantity: 0,
      location: "",
    },
  });

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch(`/api/inventory/${id}`);
        if (res.ok) {
          const data = await res.json();
          const current = data.data;
          console.log("Fetched inventory item:", current);
          console.log("Available locations:", locations);

          form.setValues({
            name: current.name,
            quantity: current.quantity,
            location: current.location,
          });
        } else {
          showNotification.error("Failed to load inventory item");
        }
      } catch {
        showNotification.error("Failed to load inventory item");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchInventory();
  }, [id, form]);

  const handleSubmit = async (values: InventoryInput) => {
    try {
      const res = await fetch(`/api/inventory/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        showNotification.success("Inventory item updated successfully");
        router.push("/inventory");
      } else {
        const error = await res.json();
        showNotification.error(error.error || "Update failed");
      }
    } catch {
      showNotification.error("Update failed");
    }
  };

  if (loading) return <Loader />;

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Title order={3}>Edit Inventory</Title>

        <TextInput label="Item Name" required {...form.getInputProps("name")} />

        <NumberInput
          label="Quantity"
          required
          min={0}
          {...form.getInputProps("quantity")}
        />

        <Select
          label="Location"
          required
          data={locations.map((loc) => ({ label: loc, value: loc }))}
          {...form.getInputProps("location")}
        />

        <Button
          type="submit"
          style={{
            backgroundColor: "var(--color-honey)",
            color: "var(--color-deep)",
          }}
        >
          Update Item
        </Button>
      </Stack>
    </form>
  );
}
