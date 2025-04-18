import mongoose, { Schema } from "mongoose";

import { HealthyHabitsTrackingForm } from "@/types";

import { UserModel } from ".";

const HealthyHabitsTrackingFormSchema = new Schema<HealthyHabitsTrackingForm>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    submittedDate: { type: String, required: true },
    weekOfSubmission: { type: String, required: true },
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
    bloodGlucose: { type: Number, required: false },
    a1c: { type: Number, required: false },
    cholesterol: { type: Number, required: false },
    qualitativeGoals: { type: String, required: true },
    sleepRanking: { type: Number, required: true },
    energyRanking: { type: Number, required: true },
    emotionalHealthRanking: { type: Number, required: true },
  },
  { versionKey: false },
);

HealthyHabitsTrackingFormSchema.post("save", async function (doc) {
  await UserModel.findByIdAndUpdate(doc.user, {
    $push: { healthyHabitsTrackingForms: doc._id },
  });
});

HealthyHabitsTrackingFormSchema.pre("findOneAndDelete", async function (next) {
  const docToDelete = await this.model
    .findOne(this.getQuery())
    .lean<HealthyHabitsTrackingForm>()
    .exec();

  if (docToDelete) {
    await UserModel.findByIdAndUpdate(docToDelete.user, {
      $pull: { healthyHabitsTrackingForms: docToDelete._id },
    });
  }

  next();
});

export default (mongoose.models
  .HealthyHabitsTrackingForm as mongoose.Model<HealthyHabitsTrackingForm>) ||
  mongoose.model<HealthyHabitsTrackingForm>(
    "HealthyHabitsTrackingForm",
    HealthyHabitsTrackingFormSchema,
  );
