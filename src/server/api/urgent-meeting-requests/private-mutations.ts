import dbConnect from "@/server/dbConnect";
import { UrgentMeetingRequestModel } from "@/server/models";
import { ApiResponse, UrgentMeetingRequest } from "@/types";
import { findByIdAndDelete } from "@/utils/db/delete";
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
  _id: string,
): Promise<ApiResponse<UrgentMeetingRequest>> {
  return await findByIdAndDelete(UrgentMeetingRequestModel, _id);
}
