"use client";

import { SwarmInput, swarmTrapSchema } from "@/lib/schemas/swarmTrap";
import {
  Button,
  Group,
  NumberInput,
  Stack,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";

export default function SwarmForm() {
  const router = useRouter();

  const form = useForm<SwarmInput>({
    validate: zodResolver(swarmTrapSchema),
    initialValues: {
      location: "",
      latitude: 42.78,
      longitude: -83.77,
      installedAt: new Date(),
      removedAt: undefined,
      notes: "",
    },
  });

  const handleSubmit = async (values: SwarmInput) => {
    const res = await fetch("/api/swarm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      router.push("/swarm");
    } else {
      alert("Failed to create swarm trap.");
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Title order={3}>New Swarm Trap</Title>

        <TextInput
          label="Location"
          placeholder="Tree line, rooftop, etc."
          required
          {...form.getInputProps("location")}
        />

        <NumberInput
          label="Latitude"
          precision={6}
          required
          {...form.getInputProps("latitude")}
        />

        <NumberInput
          label="Longitude"
          precision={6}
          required
          {...form.getInputProps("longitude")}
        />

        <DateInput
          label="Installed At"
          required
          {...form.getInputProps("installedAt")}
        />

        <DateInput
          label="Removed At"
          clearable
          {...form.getInputProps("removedAt")}
        />

        <Textarea
          label="Notes"
          autosize
          minRows={3}
          maxLength={500}
          {...form.getInputProps("notes")}
        />

        <Group justify="flex-end">
          <Button type="submit" color="yellow">
            Save Trap
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
