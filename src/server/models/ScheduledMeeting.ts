import mongoose, { Schema } from "mongoose";

import { ScheduledMeeting } from "@/types";

const ScheduledMeetingSchema = new Schema<ScheduledMeeting>(
  {
    dateCreated: {
      type: String,
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
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
  .ScheduledMeeting as mongoose.Model<ScheduledMeeting>) ||
  mongoose.model<ScheduledMeeting>("ScheduledMeeting", ScheduledMeetingSchema);
