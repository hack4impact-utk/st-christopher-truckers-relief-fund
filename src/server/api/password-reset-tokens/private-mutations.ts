import dbConnect from "@/server/dbConnect";
import { PasswordResetTokenModel } from "@/server/models";
import { ApiResponse, PasswordResetToken } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import { findOneAndDelete } from "@/utils/db/delete";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

import { getPasswordResetTokenByToken } from "./queries";

export async function createPasswordResetToken(
  token: string,
  userId: string,
  expires: string,
): Promise<ApiResponse<PasswordResetToken>> {
  await dbConnect();

  try {
    // don't create password reset token if one already exists
    const [existingToken] = await getPasswordResetTokenByToken(token);

    if (existingToken) {
      return [
        null,
        apiErrors.passwordResetToken.passwordResetTokenAlreadyExists,
      ];
    }

    const newPasswordResetToken: PasswordResetToken = {
      token,
      userId,
      expires,
    };

    const newPasswordResetTokenDocument = await PasswordResetTokenModel.create(
      newPasswordResetToken,
    );

    const passwordResetToken = newPasswordResetTokenDocument.toObject();

    return [serializeMongooseObject(passwordResetToken), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

export async function deletePasswordResetToken(
  token: string,
): Promise<ApiResponse<PasswordResetToken>> {
  return await findOneAndDelete(PasswordResetTokenModel, {
    token,
  });
}
