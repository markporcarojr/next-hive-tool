import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Button, Card, Group, Text, Title } from "@mantine/core";
import Link from "next/link";
import { notFound } from "next/navigation";
import ExpensesList from "@/components/client/ExpensesList";

export default async function ExpensePage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return <Text c="red">Unauthorized</Text>;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) return notFound();

  const expenses = await prisma.expense.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  // Convert Prisma Decimal to number for client component
  const expensesForClient = expenses.map((expense) => ({
    id: expense.id,
    item: expense.item,
    amount: Number(expense.amount),
    date: expense.date.toISOString(),
    notes: expense.notes || undefined,
  }));

  return (
    <Card withBorder p="lg" shadow="sm">
      <Group justify="space-between" mb="md">
        <Title order={3}>Expenses</Title>
        <Button component={Link} href="/finance/expenses/new">
          Add Expense
        </Button>
      </Group>

      {expensesForClient.length === 0 ? (
        <Text c="dimmed" ta="center" py="xl">
          No expenses found. Add your first expense to get started.
        </Text>
      ) : (
        <ExpensesList expenses={expensesForClient} />
      )}
    </Card>
  );
}
