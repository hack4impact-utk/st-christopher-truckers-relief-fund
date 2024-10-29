// These mutation functions are not exposed to the world for security reasons

import { UserModel } from "@/server/models";
import { User } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";

export async function updateUser(newUser: User) {
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: newUser._id },
    newUser,
    { new: true, lean: true },
  ).exec();

  if (!updatedUser) {
    return {
      success: false,
      error: apiErrors.user.userNotFound,
    };
  }

  // convert ObjectId to string
  updatedUser._id = String(updatedUser._id);

  return { success: true, data: updatedUser };
}
