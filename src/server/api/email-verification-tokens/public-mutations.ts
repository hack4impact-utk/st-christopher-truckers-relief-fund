"use server";

import { EmailVerificationToken } from "@/types";

import { sendEmailVerificationEmail } from "../emails/private-mutations";
import { getUserByEmail } from "../users/queries";
import { createEmailVerificationToken } from "./private-mutations";

export async function handleEmailVerificationTokenRequest(
  email: string,
): Promise<void> {
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
