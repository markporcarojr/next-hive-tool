// lib/schemas/harvest.ts
import { z } from "zod";

export const harvestSchema = z.object({
  harvestType: z.string().min(1),
  harvestAmount: z.number().min(1),
  harvestDate: z
    .string()
    .min(1)
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
  // 🔥 Remove this:
  // userId: z.string().min(1),
});

export type HarvestInput = z.infer<typeof harvestSchema>;
