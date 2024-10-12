import mongoose, { Schema } from "mongoose";

import { User } from "@/types";

const UserSchema = new Schema<User>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
