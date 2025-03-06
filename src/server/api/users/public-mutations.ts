"use server";
import bcrypt from "bcrypt";

import dbConnect from "@/server/dbConnect";
import { ApiResponse, ClientUser } from "@/types";
import authenticateServerFunction from "@/utils/authenticateServerFunction";
import apiErrors from "@/utils/constants/apiErrors";

import { deleteEmailVerificationToken } from "../email-verification-tokens/private-mutations";
import { getEmailVerificationTokenByToken } from "../email-verification-tokens/queries";
import { sendPasswordChangeEmail } from "../emails/private-mutations";
import { deletePasswordResetToken } from "../password-reset-tokens/private-mutations";
import { getPasswordResetTokenByToken } from "../password-reset-tokens/queries";
import { changePassword, updateUser } from "./private-mutations";
import { getUserById } from "./queries";

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

export async function handleChangePassword(
  firstName: string,
  email: string,
  oldPassword: string,
  newPassword: string,
): Promise<ApiResponse<null>> {
  const [, error] = await changePassword(email, oldPassword, newPassword);

  if (error !== null) {
    return [null, error];
  }

  await sendPasswordChangeEmail(email, firstName);

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

export async function handleClientUpdate(
  client: ClientUser,
): Promise<ApiResponse<null>> {
  const [, authError] = await authenticateServerFunction("admin");

  if (authError !== null) {
    return [null, authError];
  }

  const [, updateError] = await updateUser(client);

  if (updateError !== null) {
    return [null, updateError];
  }

  return [null, null];
}
