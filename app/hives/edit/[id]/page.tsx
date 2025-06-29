"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Group,
  NumberInput,
  Select,
  TextInput,
  Textarea,
  Title,
  Stack,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useRouter, useSearchParams } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { IconEdit } from "@tabler/icons-react";
import { HiveInput, hiveSchema } from "@/lib/schemas/hive";
import { zodResolver } from "mantine-form-zod-resolver";

export default function EditHivePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(false);

  const form = useForm<HiveInput>({
    initialValues: {
      hiveNumber: 0,
      hiveSource: "",
      hiveDate: new Date(),
      queenColor: "",
      broodBoxes: 0,
      superBoxes: 0,
      todo: "",
    },
    validate: zodResolver(hiveSchema),
  });

  useEffect(() => {
    const fetchHive = async () => {
      if (!id) return;
      const res = await fetch(`/api/hives?id=${id}`);
      const data = await res.json();
      form.setValues({
        ...data,
        hiveDate: new Date(data.hiveDate),
      });
    };
    fetchHive();
  }, [id]);

  const handleSubmit = async (values: HiveInput) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/hives?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          hiveDate: new Date(values.hiveDate).toISOString(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        notifications.show({
          title: "Update failed",
          message: errorData.message || "Could not update hive.",
          color: "red",
        });
      } else {
        notifications.show({
          title: "Hive Updated",
          message: `Hive #${values.hiveNumber} was updated successfully.`,
          color: "green",
        });
        router.push("/hives");
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Network error",
        message: "Something went wrong.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" mt="xl">
      <Title order={2} mb="lg">
        Edit Hive
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <DateInput
            label="Hive Date"
            {...form.getInputProps("hiveDate")}
            required
          />

          <NumberInput
            label="Hive Number"
            {...form.getInputProps("hiveNumber")}
            required
          />

          <Select
            label="Hive Source"
            data={["Nucleus", "Package", "Capture Swarm", "Split"]}
            {...form.getInputProps("hiveSource")}
            required
          />

          <TextInput
            label="Queen Color"
            {...form.getInputProps("queenColor")}
          />

          <NumberInput
            label="Brood Boxes"
            {...form.getInputProps("broodBoxes")}
          />

          <NumberInput
            label="Super Boxes"
            {...form.getInputProps("superBoxes")}
          />

          <Textarea label="To-do" {...form.getInputProps("todo")} />

          <Group justify="flex-end" mt="xl">
            <Button
              type="submit"
              leftSection={<IconEdit size={16} />}
              loading={loading}
            >
              Update Hive
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
}
