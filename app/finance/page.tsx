"use client";

import { useEffect, useState } from "react";
import { ExpenseInput } from "@/lib/schemas/expense";
import { IncomeInput } from "@/lib/schemas/income";
import { InvoiceInput } from "@/lib/schemas/invoice";
import { fetchData } from "@/lib/fetchData";
import {
  Card,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";

export default function FinancePage() {
  const [incomes, setIncomes] = useState<IncomeInput[]>([]);
  const [expenses, setExpenses] = useState<ExpenseInput[]>([]);
  const [invoices, setInvoices] = useState<InvoiceInput[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [income, expense, invoice] = await Promise.all([
          fetchData<IncomeInput[]>("/api/income"),
          fetchData<ExpenseInput[]>("/api/expense"),
          fetchData<InvoiceInput[]>("/api/invoice"),
        ]);
        setIncomes(income);
        setExpenses(expense);
        setInvoices(invoice);
      } catch (error) {
        console.error("Error loading finance data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="md">
        Finance Overview
      </Title>

      <Divider my="lg" />

      <Group grow align="start">
        <Card withBorder shadow="sm" radius="md">
          <Title order={4}>Income</Title>
          <Stack mt="sm">
            {incomes.length === 0 ? (
              <Text c="dimmed">No income recorded.</Text>
            ) : (
              incomes.map((income) => (
                <Text key={income.id} size="sm">
                  {income.source}: ${income.amount} –{" "}
                  {new Date(income.date).toLocaleDateString()}
                </Text>
              ))
            )}
          </Stack>
        </Card>

        <Card withBorder shadow="sm" radius="md">
          <Title order={4}>Expenses</Title>
          <Stack mt="sm">
            {expenses.length === 0 ? (
              <Text c="dimmed">No expenses recorded.</Text>
            ) : (
              expenses.map((expense) => (
                <Text key={expense.id} size="sm">
                  {expense.category} – {expense.item}: ${expense.amount} on{" "}
                  {new Date(expense.date).toLocaleDateString()}
                </Text>
              ))
            )}
          </Stack>
        </Card>

        <Card withBorder shadow="sm" radius="md">
          <Title order={4}>Invoices</Title>
          <Stack mt="sm">
            {invoices.length === 0 ? (
              <Text c="dimmed">No invoices issued.</Text>
            ) : (
              invoices.map((invoice) => (
                <Text key={invoice.id} size="sm">
                  {invoice.title} for {invoice.customerName}: ${invoice.total}{" "}
                  on {new Date(invoice.date).toLocaleDateString()}
                </Text>
              ))
            )}
          </Stack>
        </Card>
      </Group>
    </Container>
  );
}
