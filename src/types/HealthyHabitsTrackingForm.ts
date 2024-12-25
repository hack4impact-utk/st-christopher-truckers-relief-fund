import z from "zod";

export const healthyHabitsValidator = z.object({
  submittedDate: z.string(),
  healthConditions: z.string().optional(),
  devices: z.string().optional(),
  weight: z.number().int().positive(),
  movementMinutes: z.number().int().positive(),
  bloodPressure: z.string().min(1),
  bloodGlucose: z.number().int().positive(),
  a1c: z.number().int().positive().optional(),
  cholesterol: z.number().int().positive().optional(),
  qualitativeGoals: z.string().optional(),
});

export type HealthyHabitsFormValues = z.infer<typeof healthyHabitsValidator>;

export type HealthyHabitsTrackingForm = {
  _id?: string;
  email: string;
} & HealthyHabitsFormValues;
