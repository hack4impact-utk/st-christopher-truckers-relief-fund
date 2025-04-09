import mongoose, { Schema } from "mongoose";

import { FeatureFlag } from "@/types";

const FeatureFlagSchema = new Schema<FeatureFlag>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    enabled: {
      type: Boolean,
      required: true,
    },
  },
  { versionKey: false },
);

export default (mongoose.models.FeatureFlag as mongoose.Model<FeatureFlag>) ||
  mongoose.model<FeatureFlag>("FeatureFlag", FeatureFlagSchema);
