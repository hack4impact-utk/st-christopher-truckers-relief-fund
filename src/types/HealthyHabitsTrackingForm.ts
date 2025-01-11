import z from "zod";

import { User } from ".";

export const healthyHabitsValidator = z.object({
  submittedDate: z.string(),
  healthConditions: z.string(),
  devices: z.object({
    hasScale: z.boolean(),
    hasBloodPressureCuff: z.boolean(),
    hasGlucoseMonitor: z.boolean(),
    hasA1cHomeTest: z.boolean(),
    hasFitnessTracker: z.boolean(),
    hasBodyTapeMeasure: z.boolean(),
    hasResistanceBands: z.boolean(),
    hasOtherExerciseEquipment: z.boolean(),
    noneOfTheAbove: z.boolean(),
  }),
  weight: z.number().int().positive(),
  movementMinutes: z.number().int().positive(),
  systolicBloodPressure: z.number().int().positive(),
  diastolicBloodPressure: z.number().int().positive(),
  bloodGlucose: z.number().int().positive(),
  a1c: z.number().int().positive(),
  cholesterol: z.number().int().positive(),
  qualitativeGoals: z.string(),
  sleepRanking: z.number().int().min(1).max(5),
  energyRanking: z.number().int().min(1).max(5),
  emotionalHealthRanking: z.number().int().min(1).max(5),
});

export type HealthyHabitsFormValues = z.infer<typeof healthyHabitsValidator>;

export type HealthyHabitsTrackingForm = {
  _id?: string;
  user: User;
} & HealthyHabitsFormValues;
