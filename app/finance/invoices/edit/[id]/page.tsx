"use client";

import {
  InvoiceInput,
  InvoiceItemInput,
  invoiceSchema,
  PRODUCT_TYPES,
  PRODUCT_TYPE_VALUES,
} from "@/lib/schemas/invoice";
import {
  Box,
  Button,
  Divider,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { showNotification } from "@/lib/notifications";

const PRICE_MAP: Record<(typeof PRODUCT_TYPE_VALUES)[number], number> = {
  honey: 8,
  "honey bulk": 30,
  "candles small": 5,
  "candles med": 10,
  "candles lg": 10,
  "morel candle $8": 8,
  "morel candle $10": 10,
  "honey bundle": 25,
  misc: 0,
};

export default function EditInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();

  const [formData, setFormData] = useState<InvoiceInput | null>(null);
  const [items, setItems] = useState<InvoiceItemInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const updateItem = (index: number, updated: Partial<InvoiceItemInput>) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...updated };
      return copy;
    });
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { product: "honey", quantity: 1, unitPrice: PRICE_MAP["honey"] },
    ]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateTotal = () =>
    items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await fetch(`/api/finance/invoices/${id}`);
        if (!res.ok) throw new Error("Failed to fetch invoice");
        const data = await res.json();
        const invoice = data.data;

        const parsedItems =
          invoice.items?.map((item: any) => ({
            product: item.product,
            quantity: item.quantity,
            unitPrice: Number(item.unitPrice),
          })) ?? [];

        setFormData({
          customerName: invoice.customerName,
          email: invoice.email ?? "",
          phone: invoice.phone ?? "",
          notes: invoice.notes ?? "",
          date: new Date(invoice.date),
          items: parsedItems,
          total: Number(invoice.total),
        });

        setItems(parsedItems);
      } catch (err) {
        setError("Failed to load invoice record.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const handleSubmit = async () => {
    if (!formData) return;

    const payload: InvoiceInput = {
      ...formData,
      items,
      total: calculateTotal(),
    };

    setLoading(true);
    try {
      invoiceSchema.parse(payload);

      const res = await fetch(`/api/finance/invoices/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showNotification.success("Invoice updated successfully");
        router.push("/finance/invoices");
      } else {
        const error = await res.json();
        showNotification.error(error.error || "Failed to update invoice");
      }
    } catch (err) {
      console.error("[INVOICE_PATCH]", err);
      showNotification.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text c="red">{error}</Text>;
  if (!formData) return null;

  return (
    <Box p="lg" maw={900} mx="auto">
      <Title order={2} mb="lg">
        Edit Invoice
      </Title>

      <Stack gap="sm">
        <TextInput
          label="Customer Name"
          placeholder="Jane Doe"
          value={formData.customerName}
          onChange={(e) =>
            setFormData({ ...formData, customerName: e.target.value })
          }
          required
        />

        <TextInput
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <TextInput
          label="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <TextInput
          label="Date"
          type="date"
          value={formData.date.toISOString().slice(0, 10)}
          onChange={(e) =>
            setFormData({ ...formData, date: new Date(e.target.value) })
          }
          required
        />

        <Textarea
          label="Notes"
          value={formData.notes || ""}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />

        <Divider label="Products" mt="sm" mb="xs" />

        {items.map((item, index) => (
          <Group key={index} grow align="end">
            <Select
              label="Product"
              data={PRODUCT_TYPES}
              value={item.product}
              onChange={(value) => {
                const price =
                  PRICE_MAP[value as InvoiceItemInput["product"]] ?? 0;
                updateItem(index, {
                  product: value as any,
                  unitPrice: price,
                });
              }}
            />
            <NumberInput
              label="Qty"
              min={1}
              value={item.quantity}
              onChange={(val) =>
                updateItem(index, {
                  quantity: typeof val === "number" ? val : 1,
                })
              }
            />
            <NumberInput
              label="Unit Price"
              value={item.unitPrice}
              onChange={(val) =>
                updateItem(index, {
                  unitPrice: typeof val === "number" ? val : 0,
                })
              }
            />
            <Button color="red" onClick={() => removeItem(index)}>
              Remove
            </Button>
          </Group>
        ))}

        <Button variant="light" onClick={addItem}>
          + Add Item
        </Button>

        <Divider />

        <TextInput
          label="Total"
          value={`$${calculateTotal().toFixed(2)}`}
          readOnly
        />

        <Group justify="flex-end" mt="md">
          <Button
            onClick={handleSubmit}
            loading={loading}
            style={{
              backgroundColor: "var(--color-honey)",
              color: "var(--color-deep)",
            }}
          >
            Update Invoice
          </Button>
        </Group>
      </Stack>
    </Box>
  );
}
