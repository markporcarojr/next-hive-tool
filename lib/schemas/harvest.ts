// lib/schemas/harvest.ts
import { z } from "zod";

export const harvestSchema = z.object({
  harvestType: z.string().min(1),
  harvestAmount: z.number().min(1),
  harvestDate: z.coerce.date(),
});

export type HarvestInput = z.infer<typeof harvestSchema>;
