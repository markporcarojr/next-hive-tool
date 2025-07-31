"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { invoiceSchema, InvoiceInput } from "@/lib/schemas/invoice";
import {
  Button,
  Card,
  Group,
  NumberInput,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

export default function NewInvoicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<InvoiceInput>({
    initialValues: {
      title: "",
      customerName: "",
      email: "",
      phone: "",
      description: "",
      date: new Date(),
      total: 0,
      items: [],
    },
    validate: zodResolver(invoiceSchema),
  });

  const onSubmit = async (values: InvoiceInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/finance/invoice", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        router.push("/finance");
      } else {
        const error = await res.json();
        alert(error.error || "Failed to create invoice");
      }
    } catch (err) {
      console.error("[INVOICE_NEW]", err);
      alert("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card withBorder shadow="sm" radius="md" p="lg">
      <Title order={3} mb="lg">
        New Invoice
      </Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="sm">
          <TextInput
            label="Invoice Title"
            placeholder="e.g. Beekeeping Services"
            {...form.getInputProps("title")}
          />
          <TextInput
            label="Customer Name"
            placeholder="e.g. John Appleseed"
            {...form.getInputProps("customerName")}
          />
          <TextInput
            label="Email"
            placeholder="e.g. john@example.com"
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Phone"
            placeholder="e.g. (555) 123-4567"
            {...form.getInputProps("phone")}
          />
          <Textarea
            label="Description"
            placeholder="e.g. Hive removal and inspection"
            autosize
            minRows={2}
            {...form.getInputProps("description")}
          />
          <DateInput
            label="Date"
            valueFormat="YYYY-MM-DD"
            {...form.getInputProps("date")}
          />
          <NumberInput
            label="Total"
            hideControls
            {...form.getInputProps("total")}
          />
          <TextInput
            label="Items (comma-separated)"
            placeholder="e.g. Hive box, Smoker, Gloves"
            value={form.values.items?.join(", ") ?? ""}
            onChange={(e) =>
              form.setFieldValue(
                "items",
                e.currentTarget.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean)
                  .map((desc) => ({
                    description: desc,
                    quantity: 1,
                    unitPrice: 0,
                  }))
              )
            }
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit" loading={loading}>
              Save Invoice
            </Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
}
