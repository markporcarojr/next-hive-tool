"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { incomeSchema, IncomeInput } from "@/lib/schemas/income";
import {
  Button,
  Card,
  Group,
  TextInput,
  NumberInput,
  Stack,
  Text,
  Title,
import { useForm, zodResolver } from "@mantine/form";
import { IncomeInput, incomeSchema } from "@/lib/schemas/income";
import {
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

export default function NewIncomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<IncomeInput>({
    initialValues: {
      amount: 0,
      date: new Date(),
      description: "",
    },
    validate: zodResolver(incomeSchema),
  });

  const onSubmit = async (values: IncomeInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/finance/income", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        router.push("/finance");
      } else {
        const error = await res.json();
        alert(error.error || "Something went wrong.");
      }
    } catch (err) {
      console.error("[INCOME_NEW]", err);
      alert("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card withBorder shadow="sm" radius="md" p="lg">
      <Title order={3} mb="lg">
        Add New Income
      </Title>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack gap="sm">
          <TextInput label="Source" {...form.register("source")} />
          <NumberInput
            label="Amount"
            {...form.register("amount")}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, "") || ""}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value || ""))
                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : ""
            }
          />
          <DateInput label="Date" {...form.register("date")} />

      <DateInput          <TextInput label="Notes" {...form.register("notes")} />
          <Group justify="flex-end" mt="md">
            <Button type="submit" loading={loading}>
              Save Income
            </Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
}

      label="Date"
      {...form.getInputProps("date")}
      valueFormat="YYYY-MM-DD"
      />
      <TextInput
      label="Notes"
      {...form.getInputProps("notes")}
      />
      <Group justify="flex-end" mt="md">
      <Button type="submit" loading={loading}>
        Save Income
      </Button>
      </Group>
    </Stack>
    </form>
  </Card>
  );  );/>