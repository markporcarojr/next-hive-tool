export interface FinanceSummary {
  totalIncome: number;
  totalExpenses: number;
  totalInvoices: number;
  totalBalance: number;
  counts: {
    incomes: number;
    expenses: number;
    invoices: number;
  };
} 