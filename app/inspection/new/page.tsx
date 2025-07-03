"use client";

import { InspectionInput, inspectionSchema } from "@/lib/schemas/inspection";
import {
  Button,
  Container,
  Group,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateInspectionPage() {
  const router = useRouter();
  const [hives, setHives] = useState<
    { id: number; hiveNumber: number | null }[]
  >([]);

  useEffect(() => {
    const fetchHives = async () => {
      const res = await fetch("/api/hives");
      const data = await res.json();
      const simplified = data.map((h: any) => ({
        value: String(h.id),
        label: `Hive #${h.hiveNumber}`,
      }));
      setHives(simplified);
    };

    fetchHives();
  }, []);

  const form = useForm<InspectionInput>({
    initialValues: {
      temperament: "",
      hiveStrength: 0,
      hiveId: 0,
      inspectionDate: new Date(),
      inspectionImage: "",
      queen: "",
      queenCell: "",
      brood: "",
      disease: "",
      eggs: "",
      pests: "",
      feeding: "",
      treatments: "",
      inspectionNote: "",
      weatherCondition: "",
      weatherTemp: "",
    },
    validate: zodResolver(inspectionSchema),
  });

  const handleSubmit = async (values: InspectionInput) => {
    try {
      const res = await fetch("/api/inspection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          inspectionDate: new Date(values.inspectionDate).toISOString(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        notifications.show({
          title: "Error",
          message: errorData.message || "Failed to create inspection",
          color: "red",
        });
        return;
      }

      notifications.show({
        title: "Inspection Created",
        message: "Successfully added a new inspection",
        color: "green",
      });
      router.push("/inspection");
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Network Error",
        message: "Could not create inspection.",
        color: "red",
      });
    }
  };

  return (
    <Container size="sm" mt="xl">
      <Title order={2} mb="lg">
        New Inspection
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <DateInput
            label="Inspection Date"
            {...form.getInputProps("inspectionDate")}
            required
          />

          <Select
            label="Select Hive"
            placeholder="Choose a hive"
            data={hives
              .filter(
                (hive): hive is { id: number; hiveNumber: number | null } =>
                  typeof hive?.id === "number"
              )
              .map((hive) => ({
                value: hive.id.toString(), // because form expects string
                label: `Hive #${hive.hiveNumber ?? hive.id}`,
              }))}
            {...form.getInputProps("hiveId")}
            required
          />

          <TextInput
            label="Temperament"
            {...form.getInputProps("temperament")}
            required
          />

          <NumberInput
            label="Hive Strength"
            {...form.getInputProps("hiveStrength")}
            required
          />

          <TextInput label="Queen" {...form.getInputProps("queen")} />

          <TextInput label="Queen Cell" {...form.getInputProps("queenCell")} />

          <TextInput label="Brood" {...form.getInputProps("brood")} />

          <TextInput label="Disease" {...form.getInputProps("disease")} />

          <TextInput label="Eggs" {...form.getInputProps("eggs")} />

          <TextInput label="Pests" {...form.getInputProps("pests")} />

          <TextInput label="Feeding" {...form.getInputProps("feeding")} />

          <TextInput label="Treatments" {...form.getInputProps("treatments")} />

          <Textarea label="Notes" {...form.getInputProps("inspectionNote")} />

          <TextInput
            label="Weather Condition"
            {...form.getInputProps("weatherCondition")}
          />

          <TextInput
            label="Weather Temp"
            {...form.getInputProps("weatherTemp")}
          />

          <Group justify="flex-end" mt="xl">
            <Button type="submit" leftSection={<IconPlus size={16} />}>
              Add Inspection
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
}
