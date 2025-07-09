// lib/schemas/swarm.ts
import { z } from "zod";

export const swarmTrapSchema = z.object({
  swarmDate: z.coerce.date(), // ensures a real Date object
  swarmNumber: z.number().int().min(1, "swarm number is required"),
  swarmImage: z.string().url().optional(),
  swarmLocation: z.number().int(),
});

export type SwarmInput = z.infer<typeof swarmTrapSchema>;
