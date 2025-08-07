import { z } from "zod";

export const inventorySchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(1, "Name is required"),
  quantity: z.preprocess(
    (val) => (val === "" || val === null ? undefined : Number(val)),
    z
      .number({ required_error: "Quantity is required" })
      .int()
      .min(0, "Quantity must be 0 or more")
  ),

  location: z.string().min(1, "Location is required"),
});

export type InventoryInput = z.infer<typeof inventorySchema>;
