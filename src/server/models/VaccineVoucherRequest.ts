import mongoose, { Schema } from "mongoose";

import { VaccineVoucherRequest } from "@/types";

const VaccineVoucherRequestSchema = new Schema<VaccineVoucherRequest>(
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
    vaccineName: {
      type: String,
      required: true,
    },
    pharmacyName: {
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
  .VaccineVoucherRequest as mongoose.Model<VaccineVoucherRequest>) ||
  mongoose.model<VaccineVoucherRequest>(
    "VaccineVoucherRequest",
    VaccineVoucherRequestSchema,
  );
