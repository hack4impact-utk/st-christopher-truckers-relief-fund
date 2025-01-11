"use server";

import { PasswordResetToken } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

import { sendPasswordResetEmail } from "../emails/private-mutations";
import { getUserByEmail } from "../users/queries";
import { createPasswordResetToken } from "./private-mutations";

export default async function handlePasswordResetRequest(email: string) {
  // check if email exists
  const [user, userError] = await getUserByEmail(email);

  if (userError !== null) {
    return;
  }

  if (!user._id) {
    return;
  }

  // generate a password reset token
  const oneHourFromNow = dayjsUtil().utc().add(1, "hour").toISOString();
  const token: PasswordResetToken = {
    token: crypto.randomUUID(),
    userId: user._id,
    expires: oneHourFromNow,
  };

  const [, createPasswordResetTokenError] = await createPasswordResetToken(
    token.token,
    token.userId,
    token.expires,
  );

  if (createPasswordResetTokenError !== null) {
    return;
  }

  await sendPasswordResetEmail(email, token.token);
}
