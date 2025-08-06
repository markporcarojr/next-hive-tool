"use client";

import { Container, Title, SimpleGrid, Card, Text, Badge } from "@mantine/core";
import { FinanceSummary } from "@/lib/types/finance";

interface FinanceWidgetProps {
  financeSummary: FinanceSummary;
}

export default function FinanceWidget({ financeSummary }: FinanceWidgetProps) {
  const { totalIncome, totalExpenses, totalInvoices, totalBalance, counts } =
    financeSummary;

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
            ${totalExpenses.toFixed(2)}
          </Title>
          <Badge size="xs" variant="light" mt="xs">
            {counts.expenses} records
          </Badge>
        </Card>
        <Card withBorder shadow="sm">
          <Text size="sm" c="dimmed">
            Total Income
          </Text>
          <Title order={3} c="blue">
            ${totalIncome.toFixed(2)}
          </Title>
          <Badge size="xs" variant="light" mt="xs">
            {counts.incomes} records
          </Badge>
        </Card>
        <Card withBorder shadow="sm">
          <Text size="sm" c="dimmed">
            Total Invoices
          </Text>
          <Title order={3} c="yellow">
            ${totalInvoices.toFixed(2)}
          </Title>
          <Badge size="xs" variant="light" mt="xs">
            {counts.invoices} records
          </Badge>
        </Card>
        <Card withBorder shadow="sm">
          <Text size="sm" c="dimmed">
            Total Balance
          </Text>
          <Title order={3} c={totalBalance >= 0 ? "green" : "red"}>
            ${totalBalance.toFixed(2)}
          </Title>
          <Badge
            size="xs"
            variant="light"
            mt="xs"
            color={totalBalance >= 0 ? "green" : "red"}
          >
            {totalBalance >= 0 ? "Positive" : "Negative"}
          </Badge>
        </Card>
      </SimpleGrid>
    </Container>
  );
}
