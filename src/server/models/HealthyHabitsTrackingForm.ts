import mongoose, { Schema } from "mongoose";

import { HealthyHabitsTrackingForm } from "@/types";

const HealthyHabitsTrackingFormSchema = new Schema<HealthyHabitsTrackingForm>(
  {
    email: {
      type: String,
      required: true,
    },
    submittedDate: {
      type: String,
      required: true,
    },
    healthConditions: {
      type: String,
      required: true,
    },
    devices: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    movementMinutes: {
      type: Number,
      required: true,
    },
    bloodPressure: {
      type: String,
      required: true,
    },
    bloodGlucose: {
      type: Number,
      required: true,
    },
    a1c: {
      type: Number,
      required: true,
    },
    cholesterol: {
      type: Number,
      required: true,
    },
    qualitativeGoals: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

export default (mongoose.models
  .HealthyHabitsTrackingForm as mongoose.Model<HealthyHabitsTrackingForm>) ||
  mongoose.model<HealthyHabitsTrackingForm>(
    "HealthyHabitsTrackingForm",
    HealthyHabitsTrackingFormSchema,
  );
