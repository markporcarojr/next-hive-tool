// app/finance/income/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Button, Card, Group, Table, Text, Title } from "@mantine/core";
import Link from "next/link";

export default async function IncomePage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return <Text c="red">Unauthorized</Text>;

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return <Text c="red">User not found</Text>;

  const incomes = await prisma.income.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return (
    <Card withBorder p="lg" shadow="sm">
      <Group justify="space-between" mb="md">
        <Title order={3}>Income</Title>
        <Button component={Link} href="/finance/income/new">
          Add Income
        </Button>
      </Group>
      <Table highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th>Source</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income) => (
            <tr key={income.id}>
              <td>{income.source}</td>
              <td>${income.amount.toFixed(2)}</td>
              <td>{new Date(income.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
