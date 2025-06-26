"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Container,
  Group,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";

type HarvestFormValues = {
  harvestAmount: number;
  harvestType: string;
  harvestDate: Date;
};

export default function EditHarvestPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HarvestFormValues>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/harvest");
        const data = await res.json();
        const current = data.find((h: any) => h.id === Number(params.id));
        if (!current) return router.push("/harvest");

        setValue("harvestAmount", current.harvestAmount);
        setValue("harvestType", current.harvestType);
        setValue("harvestDate", new Date(current.harvestDate));
      } catch (e) {
        notifications.show({
          title: "Error",
          message: "Failed to load data",
          color: "red",
        });
        router.push("/harvest");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, router, setValue]);

  const onSubmit = async (data: HarvestFormValues) => {
    try {
      const res = await fetch(`/api/harvest?id=${params.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...data,
          harvestDate: data.harvestDate.toISOString(),
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const result = await res.json();
        notifications.show({
          title: "Error",
          message: result.message || "Update failed",
          color: "red",
        });
        return;
      }

      notifications.show({
        title: "Success",
        message: "Harvest updated!",
        color: "green",
      });
      router.push("/harvest");
    } catch (e) {
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return (
    <Container size="sm" mt="xl">
      <Title order={2} mb="lg">
        Edit Harvest
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
          value={watch("harvestDate")}
          onChange={(date) => setValue("harvestDate", date!)}
          error={errors.harvestDate && "Required"}
          mb="md"
        />

        <Group justify="flex-end" mt="xl">
          <Button type="submit">Update</Button>
        </Group>
      </form>
    </Container>
  );
}
