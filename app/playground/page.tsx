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

import { useEffect } from "react";

type Props = {
  initialValues?: SwarmInput;
  onSubmit: (values: SwarmInput) => void;
};

export default function SwarmTrapForm({ initialValues, onSubmit }: Props) {
  const form = useForm<SwarmInput>({
    validate: zodResolver(swarmTrapSchema),
    initialValues: {
      location: "",
      latitude: 42.78,
      longitude: -83.77,
      installedAt: new Date(),
      removedAt: undefined,
      notes: "",
      ...initialValues, // spread this last so it overrides defaults
    },
  });

  // 🔁 Reinitialize form values when initialValues change
  useEffect(() => {
    if (initialValues) {
      form.setValues(initialValues);
    }
  }, [initialValues]);

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <Title order={3}>Swarm Trap</Title>

        <TextInput
          label="Location"
          required
          {...form.getInputProps("location")}
        />

        <NumberInput
          label="Latitude"
          min={-90}
          max={90}
          required
          {...form.getInputProps("latitude")}
        />

        <NumberInput
          label="Longitude"
          min={-180}
          max={180}
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
          {...form.getInputProps("notes")}
        />

        <Group justify="flex-end">
          <Button
            type="submit"
            style={{
              backgroundColor: "var(--color-honey)",
              color: "var(--color-deep)",
            }}
          >
            Save Trap
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
