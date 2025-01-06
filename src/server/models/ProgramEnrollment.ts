import mongoose, { Schema } from "mongoose";

import { ProgramEnrollment } from "@/types";

const ProgramEnrollmentSchema = new Schema<ProgramEnrollment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    dateEnrolled: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

export default (mongoose.models
  .ProgramEnrollment as mongoose.Model<ProgramEnrollment>) ||
  mongoose.model<ProgramEnrollment>(
    "ProgramEnrollment",
    ProgramEnrollmentSchema,
  );
