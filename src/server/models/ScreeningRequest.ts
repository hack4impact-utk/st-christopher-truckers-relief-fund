import mongoose, { Schema } from "mongoose";

import { ScreeningRequest } from "@/types";

import { UserModel } from ".";

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

ScreeningRequestSchema.post("save", async function (doc) {
  await UserModel.findByIdAndUpdate(doc.user, {
    $push: { screeningRequests: doc._id },
  });
});

ScreeningRequestSchema.pre("findOneAndDelete", async function (next) {
  const docToDelete = await this.model
    .findOne(this.getQuery())
    .lean<ScreeningRequest>()
    .exec();

  if (docToDelete) {
    await UserModel.findByIdAndUpdate(docToDelete.user, {
      $pull: { screeningRequests: docToDelete._id },
    });
  }

  next();
});

export default (mongoose.models
  .ScreeningRequest as mongoose.Model<ScreeningRequest>) ||
  mongoose.model<ScreeningRequest>("ScreeningRequest", ScreeningRequestSchema);
