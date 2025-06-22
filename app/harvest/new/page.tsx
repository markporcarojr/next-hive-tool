"use client";

import {
  Button,
  Container,
  Group,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type HarvestFormValues = {
  harvestAmount: number;
  harvestType: string;
  harvestDate: Date;
};

export default function CreateHarvestPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<HarvestFormValues>();

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: HarvestFormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/harvest", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          harvestDate:
            data.harvestDate instanceof Date
              ? data.harvestDate.toISOString()
              : new Date(data.harvestDate).toISOString(),
        }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (!res.ok) {
        notifications.show({
          title: "Error",
          message: result?.errors?.[0] || result.message || "Submission failed",
          color: "red",
        });
      } else {
        notifications.show({
          title: "Success",
          message: "Harvest successfully recorded!",
          color: "green",
        });
        reset();
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Error",
        message: "Something went wrong.",
        color: "red",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container size="sm" mt="xl">
      <Title order={2} mb="lg">
        Add New Harvest
      </Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Harvest Amount (lbs)"
          type="number"
          {...register("harvestAmount", {
            required: true,
            valueAsNumber: true,
          })}
          error={errors.harvestAmount && "Required"}
          mb="md"
        />

        <Select
          label="Harvest Type"
          placeholder="Pick one"
          data={["Honey", "Wax"]}
          value={watch("harvestType")}
          onChange={(value) => setValue("harvestType", value!)}
          error={errors.harvestType && "Required"}
          mb="md"
        />

        <DateInput
          label="Harvest Date"
          placeholder="MM-DD-YYYY"
          valueFormat="MM-DD-YYYY"
          firstDayOfWeek={0} // Sunday
          value={watch("harvestDate")}
          onChange={(date) => setValue("harvestDate", date!)}
          error={errors.harvestDate && "Required"}
          mb="md"
        />

        <Group justify="flex-end" mt="xl">
          <Button
            type="submit"
            leftSection={<IconPlus size={16} />}
            loading={submitting}
          >
            Add Harvest
          </Button>
        </Group>
      </form>
    </Container>
  );
}
