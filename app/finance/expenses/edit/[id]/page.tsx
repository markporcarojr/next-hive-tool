"use client";

import { ExpenseInput, expenseSchema } from "@/lib/schemas/expense";
import {
  Button,
  Card,
  NumberInput,
  Stack,
  TextInput,
  Title,
  Loader,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { showNotification } from "@/lib/notifications";

export default function EditExpensePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const form = useForm<ExpenseInput>({
    validate: zodResolver(expenseSchema),
    initialValues: {
      item: "",
      amount: 0,
      date: new Date(),
      notes: "",
    },
  });

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await fetch(`/api/finance/expenses/${id}`);
        if (res.ok) {
          const data = await res.json();
          const expense = data.data;
          form.setValues({
            item: expense.item,
            amount: expense.amount,
            date: new Date(expense.date),
            notes: expense.notes || "",
          });
        } else {
          showNotification.error("Failed to load expense");
        }
      } catch {
        showNotification.error("Failed to load expense");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchExpense();
  }, [id]);

  const onSubmit = async (values: ExpenseInput) => {
    try {
      const res = await fetch(`/api/finance/expenses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        showNotification.success("Expense updated successfully");
        router.push("/finance/expenses");
      } else {
        const error = await res.json();
        showNotification.error(error.error || "Failed to update expense");
      }
    } catch {
      showNotification.error("Failed to update expense");
    }
  };

  if (loading) return <Loader />;

  return (
    <Card withBorder shadow="sm" radius="md" p="lg">
      <Title order={3} mb="lg">
        Edit Expense
      </Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="sm">
          <TextInput
            label="Item"
            placeholder="Item"
            {...form.getInputProps("item")}
          />
          <NumberInput
            label="Amount ($)"
            placeholder="Amount"
            min={0}
            step={0.01}
            {...form.getInputProps("amount")}
          />
          <DateInput
            label="Date"
            placeholder="Date"
            {...form.getInputProps("date")}
          />
          <TextInput
            label="Notes"
            placeholder="Notes"
            {...form.getInputProps("notes")}
          />
          <Button
            type="submit"
            style={{
              backgroundColor: "var(--color-honey)",
              color: "var(--color-deep)",
            }}
          >
            Update Expense
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
