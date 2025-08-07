"use client";

import { showNotification } from "@/lib/notifications";
import {
  ActionIcon,
  Anchor,
  Badge,
  Button,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

// More accurate than InvoiceInput (which doesn’t include `id`)
interface InvoiceSummary {
  id: number;
  customerName: string;
  email?: string;
  phone?: string;
  total: number;
  date: string | Date;
}

interface InvoicesListProps {
  invoices: InvoiceSummary[];
}

export default function InvoicesList({ invoices }: InvoicesListProps) {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<InvoiceSummary | null>(
    null
  );
  const [deleting, setDeleting] = useState(false);

  const handleEdit = (invoice: InvoiceSummary) => {
    router.push(`/finance/invoices/edit/${invoice.id}`);
  };

  const handleDeleteClick = (invoice: InvoiceSummary) => {
    setInvoiceToDelete(invoice);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!invoiceToDelete) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/finance/invoices/${invoiceToDelete.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showNotification.success("Invoice deleted successfully");
        router.refresh();
      } else {
        const error = await res.json();
        showNotification.error(error.error || "Failed to delete invoice");
      }
    } catch {
      showNotification.error("Failed to delete invoice");
    } finally {
      setDeleting(false);
      setDeleteModalOpen(false);
      setInvoiceToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setInvoiceToDelete(null);
  };

  return (
    <>
      <ScrollArea h={500} type="auto">
        <Table striped highlightOnHover withColumnBorders>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>
                  <Anchor
                    component={Link}
                    href={`/finance/invoices/edit/${invoice.id}`}
                  >
                    {invoice.id}
                  </Anchor>
                </td>
                <td>{invoice.customerName}</td>
                <td>{invoice.email || <Badge color="gray">N/A</Badge>}</td>
                <td>{invoice.phone || <Badge color="gray">N/A</Badge>}</td>
                <td>{`$${invoice.total.toFixed(2)}`}</td>
                <td>
                  {typeof invoice.date === "string"
                    ? invoice.date.split("T")[0]
                    : new Date(invoice.date).toISOString().split("T")[0]}
                </td>
                <td>
                  <Group gap="xs" justify="center">
                    <ActionIcon
                      variant="light"
                      color="blue"
                      onClick={() => handleEdit(invoice)}
                      title="Edit invoice"
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      color="red"
                      onClick={() => handleDeleteClick(invoice)}
                      title="Delete invoice"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>

      <Modal
        opened={deleteModalOpen}
        onClose={handleDeleteCancel}
        title="Confirm Delete"
        centered
      >
        <Stack>
          <Text>
            Are you sure you want to delete invoice #{invoiceToDelete?.id}?
          </Text>
          <Text size="sm" c="dimmed">
            This action cannot be undone.
          </Text>
          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button
              color="red"
              onClick={handleDeleteConfirm}
              loading={deleting}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
