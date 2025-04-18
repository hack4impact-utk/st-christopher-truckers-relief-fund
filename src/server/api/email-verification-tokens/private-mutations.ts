import dbConnect from "@/server/dbConnect";
import { EmailVerificationTokenModel } from "@/server/models";
import { ApiResponse, EmailVerificationToken } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import { findOneAndDelete } from "@/utils/db/delete";
import handleMongooseError from "@/utils/handleMongooseError";

import { getEmailVerificationTokenByToken } from "./queries";

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

    const newEmailVerificationToken =
      newEmailVerificationTokenDocument.toObject();

    return [newEmailVerificationToken, null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

export async function deleteEmailVerificationToken(
  token: string,
): Promise<ApiResponse<null>> {
  const [, error] = await findOneAndDelete(EmailVerificationTokenModel, {
    token,
  });

  if (error !== null) {
    return [null, error];
  }

  return [null, null];
}
