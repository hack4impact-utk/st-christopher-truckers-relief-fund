"use server";

import bcrypt from "bcrypt";

import { createPasswordResetToken } from "@/server/api/password-reset-tokens/mutations";
import { getUserByEmail } from "@/server/api/users/queries";
import dbConnect from "@/server/dbConnect";
import { UserModel } from "@/server/models";
import { ApiResponse, PasswordResetToken, User } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import dayjs from "@/utils/dayjs";
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

export async function handlePasswordResetRequest(email: string) {
  // check if email exists
  const user = await getUserByEmail(email);

  if (!user.success) {
    return;
  }

  if (!user.data) {
    return;
  }

  if (!user.data._id) {
    return;
  }

  // generate a password reset token
  const token: PasswordResetToken = {
    token: crypto.randomUUID(),
    userId: user.data._id,
    expires: dayjs().utc().add(1, "hour").toISOString(),
  };

  await createPasswordResetToken(token.token, token.userId, token.expires);

  // await sendPasswordResetEmail(email, token.token);
}
