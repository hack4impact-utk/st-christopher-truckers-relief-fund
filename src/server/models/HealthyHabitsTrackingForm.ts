import mongoose, { Schema } from "mongoose";

import { HealthyHabitsTrackingForm } from "@/types";

const HealthyHabitsTrackingFormSchema = new Schema<HealthyHabitsTrackingForm>(
  {
    email: { type: String, required: true },
    submittedDate: { type: String, required: true },
    healthConditions: { type: String, required: true },
    devices: {
      hasScale: { type: Boolean, required: true },
      hasBloodPressureCuff: { type: Boolean, required: true },
      hasGlucoseMonitor: { type: Boolean, required: true },
      hasA1cHomeTest: { type: Boolean, required: true },
      hasFitnessTracker: { type: Boolean, required: true },
      hasBodyTapeMeasure: { type: Boolean, required: true },
      hasResistanceBands: { type: Boolean, required: true },
      hasOtherExerciseEquipment: { type: Boolean, required: true },
      noneOfTheAbove: { type: Boolean, required: true },
    },
    weight: { type: Number, required: true },
    movementMinutes: { type: Number, required: true },
    systolicBloodPressure: { type: Number, required: true },
    diastolicBloodPressure: { type: Number, required: true },
    bloodGlucose: { type: Number, required: true },
    a1c: { type: Number, required: true },
    cholesterol: { type: Number, required: true },
    qualitativeGoals: { type: String, required: true },
  },
  { versionKey: false },
);

export default (mongoose.models
  .HealthyHabitsTrackingForm as mongoose.Model<HealthyHabitsTrackingForm>) ||
  mongoose.model<HealthyHabitsTrackingForm>(
    "HealthyHabitsTrackingForm",
    HealthyHabitsTrackingFormSchema,
  );
