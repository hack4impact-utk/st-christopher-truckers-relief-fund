import mongoose, { Schema } from "mongoose";

import { EmailVerificationToken } from "@/types";

const EmailVerificationTokenSchema = new Schema<EmailVerificationToken>(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

export default (mongoose.models
  .EmailVerificationToken as mongoose.Model<EmailVerificationToken>) ||
  mongoose.model<EmailVerificationToken>(
    "EmailVerificationToken",
    EmailVerificationTokenSchema,
  );