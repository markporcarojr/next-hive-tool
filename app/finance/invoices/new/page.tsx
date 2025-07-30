"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { invoiceSchema, InvoiceInput } from "@/lib/schemas/invoice";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";

import {
  Button,
  Card,
  Group,
  NumberInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

export default function NewInvoicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<InvoiceInput>({
    initialValues: {
      title: "", // required
      date: new Date(), // required
      customerName: "", // required
      notes: "", // optional
      items: [], // optional, can be empty array
      total: 0, // required, will be calculated from items
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
      <Form></Form>
      <Stack spacing="lg">
        <TextInput
          label="Invoice Title"
          required
          placeholder="Invoice Title"
          {...form.getInputProps("title")}
        />
      </Stack>
    </Card>
  );
}
