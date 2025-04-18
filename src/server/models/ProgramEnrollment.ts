import mongoose, { Schema } from "mongoose";

import { ProgramEnrollment } from "@/types";

import { UserModel } from ".";

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

ProgramEnrollmentSchema.post("save", async function (doc) {
  await UserModel.findByIdAndUpdate(doc.user, {
    $push: { programEnrollments: doc._id },
  });
});

export default (mongoose.models
  .ProgramEnrollment as mongoose.Model<ProgramEnrollment>) ||
  mongoose.model<ProgramEnrollment>(
    "ProgramEnrollment",
    ProgramEnrollmentSchema,
  );
