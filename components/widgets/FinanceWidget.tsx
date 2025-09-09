"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        // Mock data for UI testing since API endpoints are using Prisma
        setIncomes([{ amount: 1500 }, { amount: 2000 }] as IncomeInput[]);
        setExpenses([{ amount: 500 }, { amount: 300 }] as ExpenseInput[]);
        setInvoices([{ total: 1200 }, { total: 800 }] as InvoiceInput[]);
        
        /* Original API calls (disabled for UI testing):
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
        */
      } catch (error) {
        console.error("Error fetching finance data:", error);
      }
    }

    fetchAllApis();
  }, []);

  const totalIncome = incomes?.length
    ? incomes.reduce((sum, i) => sum + Number(i.amount), 0)
    : 0;
  const totalExpenses = expenses?.length
    ? expenses.reduce((sum, e) => sum + Number(e.amount), 0)
    : 0;
  const totalInvoices = invoices?.length
    ? invoices.reduce((sum, inv) => sum + Number(inv.total), 0)
    : 0;
  const totalBalance = totalIncome - totalExpenses + totalInvoices;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Finance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <h3 className="text-2xl font-bold text-red-600">
                ${totalExpenses.toFixed(2) || "0.00"}
              </h3>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Income</p>
              <h3 className="text-2xl font-bold text-blue-600">
                ${totalIncome.toFixed(2) || "0.00"}
              </h3>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Invoices</p>
              <h3 className="text-2xl font-bold text-yellow-600">
                ${totalInvoices.toFixed(2) || "0.00"}
              </h3>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Balance</p>
              <h3 className="text-2xl font-bold text-green-600">
                ${totalBalance.toFixed(2) || "0.00"}
              </h3>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
