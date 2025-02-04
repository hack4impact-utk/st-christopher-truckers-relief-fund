import dbConnect from "@/server/dbConnect";
import { UrgentMeetingRequestModel } from "@/server/models";
import { ApiResponse, UrgentMeetingRequest } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function createUrgentMeetingRequest(
  urgentMeetingRequest: UrgentMeetingRequest,
): Promise<ApiResponse<UrgentMeetingRequest>> {
  await dbConnect();

  try {
    const newUrgentMeetingRequestDocument =
      await UrgentMeetingRequestModel.create(urgentMeetingRequest);

    const newUrgentMeetingRequest = newUrgentMeetingRequestDocument.toObject();

    return [serializeMongooseObject(newUrgentMeetingRequest), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}

export async function deleteUrgentMeetingRequest(
  urgentMeetingRequest: UrgentMeetingRequest,
): Promise<ApiResponse<null>> {
  await dbConnect();

  try {
    const urgentMeetingRequestToDelete =
      await UrgentMeetingRequestModel.findByIdAndDelete(
        urgentMeetingRequest._id,
      );

    if (!urgentMeetingRequestToDelete) {
      return [
        null,
        apiErrors.urgentMeetingRequest.urgentMeetingRequestNotFound,
      ];
    }

    return [null, null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}
