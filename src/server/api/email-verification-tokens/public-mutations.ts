"use server";

import { createEmailVerificationToken } from "@/server/api/email-verification-tokens/private-mutations";
import { sendEmailVerificationEmail } from "@/server/api/emails/private-mutations";
import { getUserByEmail } from "@/server/api/users/queries";
import { EmailVerificationToken } from "@/types";

export async function handleEmailVerificationTokenRequest(email: string) {
  const [user, userError] = await getUserByEmail(email);

  if (userError !== null) {
    return;
  }

  if (!user._id) {
    return;
  }

  const token: EmailVerificationToken = {
    token: crypto.randomUUID(),
    userId: user._id,
  };

  const [, createEmailVerificationTokenError] =
    await createEmailVerificationToken(token.token, token.userId);

  if (createEmailVerificationTokenError !== null) {
    return;
  }

  await sendEmailVerificationEmail(email, token.token);
}
