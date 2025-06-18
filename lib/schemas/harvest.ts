// lib/schemas/harvest.ts
import { z } from "zod";

export const harvestSchema = z.object({
  harvestType: z.string().min(1),
  harvestAmount: z.number().min(1),
  harvestDate: z.string().min(1), // You’ll convert to Date later
  userId: z.string().min(1),
});

export type HarvestInput = z.infer<typeof harvestSchema>;
