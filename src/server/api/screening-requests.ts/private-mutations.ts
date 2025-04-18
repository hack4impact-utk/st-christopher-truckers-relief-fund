import dbConnect from "@/server/dbConnect";
import { ScreeningRequestModel, UserModel } from "@/server/models";
import { ApiResponse, ScreeningRequest } from "@/types";
import { findByIdAndDelete } from "@/utils/db/delete";
import { findOneAndUpdate } from "@/utils/db/update";
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
  return await findOneAndUpdate(ScreeningRequestModel, screeningRequest);
}

export async function deleteScreeningRequest(
  screeningRequest: ScreeningRequest,
): Promise<ApiResponse<ScreeningRequest>> {
  return await findByIdAndDelete(ScreeningRequestModel, screeningRequest._id!);
}
