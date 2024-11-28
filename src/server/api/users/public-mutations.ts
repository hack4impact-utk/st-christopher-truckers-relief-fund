"use server";

import bcrypt from "bcrypt";

import { deleteEmailVerificationToken } from "@/server/api/email-verification-tokens/private-mutations";
import { getEmailVerificationTokenByToken } from "@/server/api/email-verification-tokens/queries";
import { deletePasswordResetToken } from "@/server/api/password-reset-tokens/private-mutations";
import { getPasswordResetTokenByToken } from "@/server/api/password-reset-tokens/queries";
import { updateUser } from "@/server/api/users/private-mutations";
import { getUserByEmail, getUserById } from "@/server/api/users/queries";
import dbConnect from "@/server/dbConnect";
import { UserModel } from "@/server/models";
import { ApiResponse, User } from "@/types";
import authenticateServerFunction from "@/utils/authenticateServerFunction";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";

export async function createUser(user: User): Promise<ApiResponse<User>> {
  await dbConnect();

  try {
    // don't create user if one already exists
    const [userInDatabase] = await getUserByEmail(user.email);

    if (userInDatabase) {
      return [null, apiErrors.user.userAlreadyExists];
    }

    // hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const newUserDocument = await UserModel.create(user);

    // convert ObjectId to string
    const newUser = newUserDocument.toObject();
    newUser._id = String(newUser._id);

    return [newUser, null];
  } catch (error) {
    return [null, handleMongooseError(error)];
  }
}

export async function resetPasswordWithToken(
  token: string,
  newPassword: string,
): Promise<ApiResponse<null>> {
  await dbConnect();

  const [passwordResetToken, passwordResetError] =
    await getPasswordResetTokenByToken(token);

  if (passwordResetError !== null) {
    return [null, passwordResetError];
  }

  const [user, userError] = await getUserById(passwordResetToken.userId);

  if (userError !== null) {
    return [null, userError];
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  await updateUser(user);

  await deletePasswordResetToken(token);

  return [null, null];
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

export async function verifyEmailWithToken(
  token: string,
): Promise<ApiResponse<null>> {
  await dbConnect();

  const [session, sessionError] = await authenticateServerFunction();

  if (sessionError !== null) {
    return [null, sessionError];
  }

  const [emailVerificationToken, emailVerificationTokenError] =
    await getEmailVerificationTokenByToken(token);

  if (emailVerificationTokenError !== null) {
    return [
      null,
      apiErrors.emailVerificationToken.emailVerificationTokenNotFound,
    ];
  }

  const [user, userError] = await getUserById(emailVerificationToken.userId);

  if (userError !== null) {
    return [null, userError];
  }

  if (session.user.email !== user.email) {
    return [null, apiErrors.user.userInvalidCredentials];
  }

  user.isEmailVerified = true;

  await updateUser(user);

  await deleteEmailVerificationToken(token);

  return [null, null];
}
