"use client";

import { showNotification } from "@/lib/notifications";
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Expense {
  id: number;
  item: string;
  amount: number;
  date: string;
  notes?: string;
}

interface ExpensesListProps {
  expenses: Expense[];
}

export default function ExpensesList({ expenses }: ExpensesListProps) {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleEdit = (expense: Expense) => {
    router.push(`/finance/expenses/edit/${expense.id}`);
  };

  const handleDeleteClick = (expense: Expense) => {
    setExpenseToDelete(expense);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!expenseToDelete) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/finance/expenses/${expenseToDelete.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showNotification.success("Expense deleted successfully");
        router.refresh(); // Refresh the page to show updated data
      } else {
        const error = await res.json();
        showNotification.error(error.error || "Failed to delete expense");
      }
    } catch {
      showNotification.error("Failed to delete expense");
    } finally {
      setDeleting(false);
      setDeleteModalOpen(false);
      setExpenseToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setExpenseToDelete(null);
  };

  return (
    <>
      <Table highlightOnHover withColumnBorders striped>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Item</th>
            <th style={{ textAlign: "left" }}>Amount</th>
            <th style={{ textAlign: "left" }}>Date</th>
            <th style={{ textAlign: "left" }}>Notes</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.item}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{new Date(expense.date).toISOString().split("T")[0]}</td>
              <td>{expense.notes || "-"}</td>
              <td>
                <Group gap="xs" justify="center">
                  <ActionIcon
                    variant="light"
                    color="blue"
                    onClick={() => handleEdit(expense)}
                    title="Edit expense"
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    variant="light"
                    color="red"
                    onClick={() => handleDeleteClick(expense)}
                    title="Delete expense"
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpen}
        onClose={handleDeleteCancel}
        title="Confirm Delete"
        centered
      >
        <Stack>
          <Text>
            Are you sure you want to delete the expense "{expenseToDelete?.item}
            "?
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
