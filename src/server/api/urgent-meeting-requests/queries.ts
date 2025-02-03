import dbConnect from "@/server/dbConnect";
import { UrgentMeetingRequestModel } from "@/server/models";
import { ApiResponse, UrgentMeetingRequest } from "@/types";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function getAllUrgentMeetingRequests(): Promise<
  ApiResponse<UrgentMeetingRequest[]>
> {
  await dbConnect();

  try {
    const urgentMeetingRequests = await UrgentMeetingRequestModel.find()
      .lean<UrgentMeetingRequest[]>()
      .exec();

    return [serializeMongooseObject(urgentMeetingRequests), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}
