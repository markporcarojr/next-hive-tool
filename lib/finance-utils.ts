import { prisma } from "@/lib/prisma";
import { FinanceSummary } from "@/lib/types/finance";

export async function getFinanceSummary(userId: number): Promise<FinanceSummary> {
  // Fetch all finance data in parallel
  const [incomes, expenses, invoices] = await Promise.all([
    prisma.income.findMany({
      where: { userId },
      select: { amount: true }
    }),
    prisma.expense.findMany({
      where: { userId },
      select: { amount: true }
    }),
    prisma.invoice.findMany({
      where: { userId },
      select: { total: true }
    })
  ]);

  // Calculate totals
  const totalIncome = incomes.reduce((sum, income) => sum + Number(income.amount), 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const totalInvoices = invoices.reduce((sum, invoice) => sum + Number(invoice.total), 0);
  const totalBalance = totalIncome - totalExpenses + totalInvoices;

  return {
    totalIncome,
    totalExpenses,
    totalInvoices,
    totalBalance,
    counts: {
      incomes: incomes.length,
      expenses: expenses.length,
      invoices: invoices.length
    }
  };
} 