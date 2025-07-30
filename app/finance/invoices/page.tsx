import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Button, Card, Group, Table, Text, Title } from "@mantine/core";
import Link from "next/link";

export default async function InvoicePage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return <Text c="red">Unauthorized</Text>;

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return <Text c="red">User not found</Text>;

  const invoices = await prisma.invoice.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return (
    <Card withBorder p="lg" shadow="sm">
      <Group justify="space-between" mb="md">
        <Title order={3}>Invoices</Title>
        <Button component={Link} href="/finance/invoices/new">
          New Invoice
        </Button>
      </Group>
      <Table highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th>Title</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.title}</td>
              <td>{invoice.customerName}</td>
              <td>${invoice.total.toFixed(2)}</td>
              <td>{new Date(invoice.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
