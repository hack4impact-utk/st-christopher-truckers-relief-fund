"use server";

import { sendPasswordResetEmail } from "@/server/api/emails/private-mutations";
import { createPasswordResetToken } from "@/server/api/password-reset-tokens/private-mutations";
import { getUserByEmail } from "@/server/api/users/queries";
import { PasswordResetToken } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

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
