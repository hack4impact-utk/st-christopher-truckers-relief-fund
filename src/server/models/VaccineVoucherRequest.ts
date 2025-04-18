import mongoose, { Schema } from "mongoose";

import { VaccineVoucherRequest } from "@/types";

import { UserModel } from ".";

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

VaccineVoucherRequestSchema.pre("findOneAndDelete", async function (next) {
  const docToDelete = await this.model
    .findOne(this.getQuery())
    .lean<VaccineVoucherRequest>()
    .exec();

  if (docToDelete) {
    await UserModel.findByIdAndUpdate(docToDelete.user, {
      $pull: { vaccineVoucherRequests: docToDelete._id },
    });
  }

  next();
});

export default (mongoose.models
  .VaccineVoucherRequest as mongoose.Model<VaccineVoucherRequest>) ||
  mongoose.model<VaccineVoucherRequest>(
    "VaccineVoucherRequest",
    VaccineVoucherRequestSchema,
  );
