import { z } from "zod";

// Prisma Decimal type is usually handled as string or number in input schemas
export const expenseSchema = z.object({
  id: z.number().int().optional(), // id is auto-incremented, optional for input
  item: z.string().min(1, "Item is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  date: z.coerce.date(),
  notes: z.string().optional(),
  userId: z.number().int(),
  createdAt: z.coerce.date().optional(), // auto-generated, optional for input
  updatedAt: z.coerce.date().optional(), // auto-generated, optional for input
});

export type ExpenseInput = z.infer<typeof expenseSchema>;
