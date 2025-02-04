import mongoose, { Schema } from "mongoose";

import { UrgentMeetingRequest } from "@/types";

const UrgentMeetingRequestSchema = new Schema<UrgentMeetingRequest>(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

export default (mongoose.models
  .UrgentMeetingRequest as mongoose.Model<UrgentMeetingRequest>) ||
  mongoose.model<UrgentMeetingRequest>(
    "UrgentMeetingRequest",
    UrgentMeetingRequestSchema,
  );
