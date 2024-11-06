import z from "zod";

export const healthyHabitsValidator = z.object({
  // account information
  healthConditions: z.string().optional(),
  devices: z.string().optional(),

  // mandatory
  weight: z.number().int().positive(),
  movementMinutes: z.number().int().positive(),
  bloodPressure: z.string().min(1),
  bloodGlucose: z.number().int().positive(),

  // optional
  a1c: z.number().int().positive().optional(),
  cholesterol: z.number().int().positive().optional(),
  qualitativeGoals: z.string().optional(),
});

export type HealthyHabitsFormValues = z.infer<typeof healthyHabitsValidator>;
