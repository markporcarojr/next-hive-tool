import { z } from "zod";

const invoiceItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().positive("Quantity must be greater than 0"),
  unitPrice: z.coerce.number().nonnegative("Price must be 0 or more"),
});

export const invoiceSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  date: z.coerce.date(),
  dueDate: z.coerce.date().optional(),
  items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
  notes: z.string().optional(),
  total: z.coerce.number().nonnegative(),
});
export type InvoiceItem = z.infer<typeof invoiceItemSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;
