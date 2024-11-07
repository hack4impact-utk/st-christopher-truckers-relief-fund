import mongoose, { Schema } from "mongoose";

import { OldEnrollmentForm } from "@/types";

const EnrollmentFormSchema = new Schema<OldEnrollmentForm>(
  {
    _id: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: String,
      required: true,
    },
    hasAcknowledgedPrivacyNotice: {
      type: Boolean,
      required: true,
    },
    hasAcknowledgedHipaaNotice: {
      type: Boolean,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    hasClassACdl: {
      type: Boolean,
      required: true,
    },
    classBDescription: {
      type: String,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    healthConditions: {
      type: String,
    },
    recentIllnessOrInjuryDetails: {
      type: String,
    },
    drivesSemiTruckOverRoad: {
      type: Boolean,
      required: true,
    },
    isUsCitizen: {
      type: Boolean,
      required: true,
    },
    referralSource: {
      type: String,
    },
    doctors: {
      type: Array,
    },
    employer: {
      type: Object,
    },
    monthlyHouseholdExpenses: {
      type: Number,
      required: true,
    },
    ownerOperatorInfo: {
      type: Object,
    },
    healthMetrics: {
      type: Object,
    },
    healthGoals: {
      type: Object,
    },
    devices: {
      type: Array,
    },
  },
  { versionKey: false },
);

export default (mongoose.models
  .EnrollmentForm as mongoose.Model<OldEnrollmentForm>) ||
  mongoose.model<OldEnrollmentForm>("EnrollmentForm", EnrollmentFormSchema);
