import dbConnect from "@/server/dbConnect";
import { ScreeningRequestModel, UserModel } from "@/server/models";
import { ApiResponse, ScreeningRequest } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import { findByIdAndDelete } from "@/utils/db/delete";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function createScreeningRequest(
  screeningRequest: ScreeningRequest,
): Promise<ApiResponse<ScreeningRequest>> {
  await dbConnect();

  try {
    const newScreeningRequestDocument =
      await ScreeningRequestModel.create(screeningRequest);

    const newScreeningRequest = newScreeningRequestDocument.toObject();

    // add screening request to user
    await UserModel.findByIdAndUpdate(newScreeningRequest.user._id, {
      $push: { screeningRequests: newScreeningRequest._id },
    });

    return [serializeMongooseObject(newScreeningRequest), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

export async function updateScreeningRequest(
  screeningRequest: ScreeningRequest,
): Promise<ApiResponse<ScreeningRequest>> {
  await dbConnect();

  try {
    const updatedScreeningRequest =
      await ScreeningRequestModel.findOneAndUpdate(
        { _id: screeningRequest._id },
        screeningRequest,
        { new: true, lean: true },
      ).exec();

    if (!updatedScreeningRequest) {
      return [null, apiErrors.screeningRequest.screeningRequestNotFound];
    }

    return [serializeMongooseObject(updatedScreeningRequest), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

export async function deleteScreeningRequest(
  screeningRequest: ScreeningRequest,
): Promise<ApiResponse<null>> {
  const [, error] = await findByIdAndDelete(
    ScreeningRequestModel,
    screeningRequest._id!,
  );

  if (error !== null) {
    return [null, error];
  }

  return [null, null];
}
