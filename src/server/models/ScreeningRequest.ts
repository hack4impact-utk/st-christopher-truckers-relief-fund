import mongoose, { Schema } from "mongoose";

import { ScreeningRequest } from "@/types";

const ScreeningRequestSchema = new Schema<ScreeningRequest>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    submittedDate: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

export default (mongoose.models
  .ScreeningRequest as mongoose.Model<ScreeningRequest>) ||
  mongoose.model<ScreeningRequest>("ScreeningRequest", ScreeningRequestSchema);
