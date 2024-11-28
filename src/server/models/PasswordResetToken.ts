import mongoose, { Schema } from "mongoose";

import { PasswordResetToken } from "@/types";

const PasswordResetTokenSchema = new Schema<PasswordResetToken>(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    expires: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

export default (mongoose.models
  .PasswordResetToken as mongoose.Model<PasswordResetToken>) ||
  mongoose.model<PasswordResetToken>(
    "PasswordResetToken",
    PasswordResetTokenSchema,
  );