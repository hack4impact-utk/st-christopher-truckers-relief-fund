"use server";

import bcrypt from "bcrypt";

import { getPasswordResetTokenByToken } from "@/server/api/password-reset-tokens/queries";
import { getUserByEmail, getUserById } from "@/server/api/users/queries";
import { updateUser } from "@/server/api/users/secure-mutations";
import dbConnect from "@/server/dbConnect";
import { UserModel } from "@/server/models";
import { ApiResponse, User } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";

export async function createUser(user: User): Promise<ApiResponse<User>> {
  await dbConnect();

  try {
    // don't create user if one already exists
    const existingUser = await getUserByEmail(user.email);
    if (existingUser.success) {
      return { success: false, error: apiErrors.user.userAlreadyExists };
    }

    // hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const newUserDocument = await UserModel.create(user);

    // convert ObjectId to string
    const newUser = newUserDocument.toObject();
    newUser._id = String(newUser._id);

    return { success: true, data: newUser };
  } catch (error) {
    return { success: false, error: handleMongooseError(error) };
  }
}

export async function resetPasswordWithToken(
  token: string,
  newPassword: string,
): Promise<ApiResponse<null>> {
  const passwordResetTokenResponse = await getPasswordResetTokenByToken(token);

  if (!passwordResetTokenResponse.success) {
    return passwordResetTokenResponse;
  }

  const passwordResetToken = passwordResetTokenResponse.data;

  const userResponse = await getUserById(passwordResetToken.userId);

  if (!userResponse.success) {
    return userResponse;
  }

  const user = userResponse.data;

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  await updateUser(user);

  return { success: true, data: null };
}
