import { z } from "zod";

export const expenseSchema = z.object({
  item: z.string().min(1, "Item is required"),
  category: z.string().min(1, "Category is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  date: z.coerce.date(),
  notes: z.string().optional(),
});

export type ExpenseInput = z.infer<typeof expenseSchema>;
