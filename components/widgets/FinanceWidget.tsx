"use client";

import { Container, Title, SimpleGrid, Card, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { InvoiceInput } from "@/lib/schemas/invoice";
import { IncomeInput } from "@/lib/schemas/income";
import { ExpenseInput } from "@/lib/schemas/expense";

export default function FinanceWidget() {
  const [incomes, setIncomes] = useState<IncomeInput[]>([]);
  const [expenses, setExpenses] = useState<ExpenseInput[]>([]);
  const [invoices, setInvoices] = useState<InvoiceInput[]>([]);

  useEffect(() => {
    async function fetchAllApis() {
      try {
        const [incomeRes, expenseRes, invoiceRes] = await Promise.all([
          fetch("/api/finance/income"),
          fetch("/api/finance/expenses"),
          fetch("/api/finance/invoices"),
        ]);

        const [incomeData, expenseData, invoiceData] = await Promise.all([
          incomeRes.json(),
          expenseRes.json(),
          invoiceRes.json(),
        ]);

        setIncomes(incomeData);
        setExpenses(expenseData);
        setInvoices(invoiceData);
      } catch (error) {
        console.error("Error fetching finance data:", error);
      }
    }

    fetchAllApis();
  }, []);

  if (!incomes || !expenses || !invoices) {
    const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount), 0);
    const totalExpenses = expenses.reduce(
      (sum, e) => sum + Number(e.amount),
      0
    );
    const totalInvoices = invoices.reduce(
      (sum, inv) => sum + Number(inv.total),
      0
    );
    const totalBalance = totalIncome - totalExpenses + totalInvoices;
  }
  // If balance = income - expenses - invoices

  return (
    <Container>
      <Title order={2} mb="md">
        Finance Overview
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm">
        <Card withBorder shadow="sm">
          <Text size="sm" c="dimmed">
            Total Expenses
          </Text>
          <Title order={3} c="red">
            ${totalExpenses.toFixed(2) || "0.00"}
          </Title>
        </Card>
        <Card withBorder shadow="sm">
          <Text size="sm" c="dimmed">
            Total Income
          </Text>
          <Title order={3} c="blue">
            ${totalIncome.toFixed(2) || "0.00"}
          </Title>
        </Card>
        <Card withBorder shadow="sm">
          <Text size="sm" c="dimmed">
            Total Invoices
          </Text>
          <Title order={3} c="yellow">
            ${totalInvoices.toFixed(2) || "0.00"}
          </Title>
        </Card>
        <Card withBorder shadow="sm">
          <Text size="sm" c="dimmed">
            Total Balance
          </Text>
          <Title order={3} c="green">
            ${totalBalance.toFixed(2) || "0.00"}
          </Title>
        </Card>
      </SimpleGrid>
    </Container>
  );
}
