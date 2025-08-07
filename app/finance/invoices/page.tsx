import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Button, Card, Group, Text, Title } from "@mantine/core";
import Link from "next/link";
import InvoicesList from "@/components/client/InvoiceList";

export default async function InvoicePage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return <Text c="red">Unauthorized</Text>;

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return <Text c="red">User not found</Text>;

  const rawInvoices = await prisma.invoice.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
    include: {
      items: true, // 👈 include the items
    },
  });

  const invoices = rawInvoices.map((invoice) => ({
    ...invoice,
    total: Number(invoice.total), // 👈 convert Decimal to number
    date: invoice.date.toISOString(), // 👈 make sure Date is serializable
  }));

  return (
    <Card withBorder p="lg" shadow="sm" radius="md">
      <Group justify="space-between" mb="md">
        <Title order={3}>Invoices</Title>
        <Button component={Link} href="/finance/invoices/new">
          New Invoice
        </Button>
      </Group>

      {invoices.length === 0 ? (
        <Text c="dimmed" ta="center">
          No invoices yet. Click &quot;New Invoice&quot; to create your first
          one.
        </Text>
      ) : (
        <InvoicesList invoices={invoices} /> // 👈 drop it in
      )}
    </Card>
  );
}
