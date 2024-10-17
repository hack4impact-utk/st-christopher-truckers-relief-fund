import mongoose, { Schema } from "mongoose";

import { ProgramEnrollment } from "@/types";

const ProgramEnrollmentSchema = new Schema<ProgramEnrollment>(
  {
    status: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    enrollmentForm: {
      type: Schema.Types.ObjectId,
      ref: "EnrollmentForm",
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
