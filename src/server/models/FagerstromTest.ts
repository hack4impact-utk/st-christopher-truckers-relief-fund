import mongoose, { Schema } from "mongoose";

import { FagerstromTest } from "@/types";

import { UserModel } from ".";

const FagerstromTestSchema = new Schema<FagerstromTest>(
  {
    submittedDate: {
      type: String,
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doesUseCigarettes: {
      type: Boolean,
      required: true,
    },
    cigaretteFagerstromScore: {
      type: Number,
      required: true,
    },
    firstSmokeTime: {
      type: String,
      required: true,
    },
    isDifficultToNotSmokeInForbiddenAreas: {
      type: Boolean,
      required: true,
    },
    cigaretteHateToGiveUp: {
      type: String,
      required: true,
    },
    cigarettesPerDay: {
      type: String,
      required: true,
    },
    smokeMoreInMorning: {
      type: Boolean,
      required: true,
    },
    smokeWhenIll: {
      type: Boolean,
      required: true,
    },

    doesUseSmokelessTobacco: {
      type: Boolean,
      required: true,
    },
    tobaccoFagerstromScore: {
      type: Number,
      required: true,
    },
    firstTobaccoTime: {
      type: String,
      required: true,
    },
    swallowTobaccoJuice: {
      type: String,
      required: true,
    },
    tobaccoHateToGiveUp: {
      type: String,
      required: true,
    },
    tobaccoCansPerWeek: {
      type: String,
      required: true,
    },
    tobaccoChewMoreAfterAwakening: {
      type: Boolean,
      required: true,
    },
    tobaccoChewWhenIll: {
      type: Boolean,
      required: true,
    },
  },
  { versionKey: false },
);

FagerstromTestSchema.post("save", async function (doc) {
  await UserModel.findByIdAndUpdate(doc.client, {
    $push: { fagerstromTests: doc._id },
  });
});

FagerstromTestSchema.pre("findOneAndDelete", async function (next) {
  const docToDelete = await this.model
    .findOne(this.getQuery())
    .lean<FagerstromTest>()
    .exec();

  if (docToDelete) {
    await UserModel.findByIdAndUpdate(docToDelete.client, {
      $pull: { fagerstromTests: docToDelete._id },
    });
  }

  next();
});

export default (mongoose.models
  .FagerstromTest as mongoose.Model<FagerstromTest>) ||
  mongoose.model<FagerstromTest>("FagerstromTest", FagerstromTestSchema);
