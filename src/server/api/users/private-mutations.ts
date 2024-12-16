// These mutation functions are not exposed to the world for security reasons

import bcrypt from "bcrypt";

import { getUserByEmail } from "@/server/api/users/queries";
import dbConnect from "@/server/dbConnect";
import { UserModel } from "@/server/models";
import { ApiResponse, User } from "@/types";
import authenticateServerFunction from "@/utils/authenticateServerFunction";
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

export async function changePassword(
  email: string,
  oldPassword: string,
  newPassword: string,
): Promise<ApiResponse<null>> {
  await dbConnect();

  const [session, sessionError] = await authenticateServerFunction();

  if (sessionError !== null) {
    return [null, sessionError];
  }

  if (oldPassword.length < 8 || newPassword.length < 8) {
    return [null, apiErrors.user.userInvalidCredentials];
  }

  if (session.user.email !== email) {
    return [null, apiErrors.user.userInvalidCredentials];
  }

  const [user, userError] = await getUserByEmail(email);

  if (userError !== null) {
    return [null, userError];
  }

  const doesOldPasswordsMatch = await bcrypt.compare(
    oldPassword,
    user.password,
  );

  if (!doesOldPasswordsMatch) {
    return [null, apiErrors.user.userInvalidCredentials];
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  await updateUser(user);

  return [null, null];
}
