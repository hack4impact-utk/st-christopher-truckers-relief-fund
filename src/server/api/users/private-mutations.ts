// These mutation functions are not exposed to the world for security reasons

import dbConnect from "@/server/dbConnect";
import { UserModel } from "@/server/models";
import { ApiResponse, User } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";

export async function updateUser(newUser: User): Promise<ApiResponse<User>> {
  await dbConnect();

  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: newUser._id },
    newUser,
    { new: true, lean: true },
  ).exec();

  if (!updatedUser) {
    return [null, apiErrors.user.userNotFound];
  }

  // convert ObjectId to string
  updatedUser._id = String(updatedUser._id);

  return [updatedUser, null];
}
