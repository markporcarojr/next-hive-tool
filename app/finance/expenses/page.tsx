import { Button } from "@mantine/core";
import Link from "next/link";
import React from "react";

type Expense = {
  id: number;
  description: string;
  amount: number;
  date: string;
};

const mockExpenses: Expense[] = [
  { id: 1, description: "Office Supplies", amount: 120.5, date: "2024-06-01" },
  { id: 2, description: "Travel", amount: 350, date: "2024-06-03" },
  {
    id: 3,
    description: "Software Subscription",
    amount: 89.99,
    date: "2024-06-05",
  },
];

const ExpensesPage = () => {
  const total = mockExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div>
      <h1>Expenses Summary</h1>
      <Button
        variant="filled"
        color="#f4b400"
        component={Link}
        href="/finance/expenses/new"
      >
        Add Expenses
      </Button>
      <p>Total: ${total.toFixed(2)}</p>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {mockExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.date}</td>
              <td>{expense.description}</td>
              <td>{expense.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              <strong>Total</strong>
            </td>
            <td>
              <strong>{total.toFixed(2)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpensesPage;
