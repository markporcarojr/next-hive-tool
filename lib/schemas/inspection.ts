import { z } from "zod";

export const inspectionSchema = z.object({
  hiveNumber: z.number().min(1),
  temperament: z.string().min(1),
  hiveStrength: z.number().min(1),
  inspectionDate: z.coerce.date(),

  inspectionImage: z.string().url().optional().or(z.literal("")),
  queen: z.string().optional(),
  queenCell: z.string().optional(),
  brood: z.string().optional(),
  disease: z.string().optional(),
  eggs: z.string().optional(),
  pests: z.string().optional(),
  feeding: z.string().optional(),
  treatments: z.string().optional(),
  inspectionNote: z.string().optional(),
  weatherCondition: z.string().optional(),
  weatherTemp: z.string().optional(),

  userId: z.number().optional(), // will be injected from auth context
  hiveId: z.number().min(1),
});

export type InspectionInput = z.infer<typeof inspectionSchema>;
