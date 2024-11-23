"use server";

import { getEmailVerificationTokenByToken } from "@/server/api/email-verification-tokens/queries";
import { sendEmailVerificationEmail } from "@/server/api/emails/actions";
import { getUserByEmail } from "@/server/api/users/queries";
import dbConnect from "@/server/dbConnect";
import { EmailVerificationTokenModel } from "@/server/models";
import { ApiResponse, EmailVerificationToken } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";

export async function createEmailVerificationToken(
  token: string,
  userId: string,
): Promise<ApiResponse<EmailVerificationToken>> {
  await dbConnect();

  try {
    // don't create email verification token if one already exists
    const [existingEmailVerificationToken] =
      await getEmailVerificationTokenByToken(token);

    if (existingEmailVerificationToken) {
      return [
        null,
        apiErrors.emailVerificationToken.emailVerificationTokenAlreadyExists,
      ];
    }

    const emailVerificationToken: EmailVerificationToken = {
      token,
      userId,
    };

    const newEmailVerificationTokenDocument =
      await EmailVerificationTokenModel.create(emailVerificationToken);

    // convert ObjectId to string
    const newEmailVerificationToken =
      newEmailVerificationTokenDocument.toObject();

    newEmailVerificationToken._id = String(newEmailVerificationToken._id);

    return [newEmailVerificationToken, null];
  } catch (error) {
    return [null, handleMongooseError(error)];
  }
}

export async function deleteEmailVerificationToken(
  token: string,
): Promise<ApiResponse<null>> {
  await dbConnect();

  try {
    const emailVerificationToken =
      await EmailVerificationTokenModel.findOneAndDelete({
        token,
      });

    if (!emailVerificationToken) {
      return [
        null,
        apiErrors.emailVerificationToken.emailVerificationTokenNotFound,
      ];
    }

    return [null, null];
  } catch (error) {
    return [null, handleMongooseError(error)];
  }
}

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
