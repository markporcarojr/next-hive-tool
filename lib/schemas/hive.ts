// lib/schemas/hive.ts
import { z } from "zod";

export const hiveSchema = z.object({
  hiveDate: z.coerce.date(), // ensures a real Date object
  hiveNumber: z.number().int().min(1, "Hive number is required"),
  hiveSource: z.string().min(1, "Hive source is required"),
  hiveImage: z.string().url().optional(),
  broodBoxes: z.number().int().nonnegative().optional(),
  superBoxes: z.number().int().nonnegative().optional(),
  hiveStrength: z.number().int().min(0).max(100).optional(),
  queenColor: z.string().optional(),
  queenAge: z.string().optional(),
  queenExcluder: z.string().optional(),
  breed: z.string().optional(),
  frames: z.number().int().nonnegative().optional(),
  todo: z.string().optional(), // 🐝 new field
});
export type HiveInput = z.infer<typeof hiveSchema>;
