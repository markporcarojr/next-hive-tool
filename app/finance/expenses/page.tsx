import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Button, Card, Group, Table, Text, Title } from "@mantine/core";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ExpensePage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return <Text c="red">Unauthorized</Text>; // Optional: redirect instead

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) return notFound();

  const expenses = await prisma.expense.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return (
    <Card withBorder p="lg" shadow="sm">
      <Group justify="space-between" mb="md">
        <Title order={3}>Expenses</Title>
        <Button component={Link} href="/finance/expenses/new">
          Add Expense
        </Button>
      </Group>

      <Table highlightOnHover withColumnBorders striped>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Item</th>
            <th style={{ textAlign: "left" }}>Amount</th>
            <th style={{ textAlign: "left" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.item}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{new Date(expense.date).toISOString().split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
