import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Button, Card, Group, Table, Text, Title } from "@mantine/core";
import Link from "next/link";

export default async function ExpensePage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return <Text c="red">Unauthorized</Text>;

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return <Text c="red">User not found</Text>;

  const expenses = await prisma.expense.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return (
    <Card withBorder p="lg" shadow="sm">
      <Group justify="space-between" mb="md">
        <Title order={3}>Expenses</Title>
        {/* <Button component={Link} href="/finance/expense/new">
          Add Expense
        </Button> */}
      </Group>
      <Table highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th>Item</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.item}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
