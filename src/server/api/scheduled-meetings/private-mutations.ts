import dbConnect from "@/server/dbConnect";
import { ScheduledMeetingModel } from "@/server/models";
import { ApiResponse, ScheduledMeeting } from "@/types";
import apiErrors from "@/utils/constants/apiErrors";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function createScheduledMeeting(
  scheduledMeeting: ScheduledMeeting,
): Promise<ApiResponse<ScheduledMeeting>> {
  await dbConnect();

  try {
    const newScheduledMeeting =
      await ScheduledMeetingModel.create(scheduledMeeting);

    const newScheduledMeetingWithPopulatedClient =
      await newScheduledMeeting.populate("client");

    const newScheduledMeetingDocument =
      newScheduledMeetingWithPopulatedClient.toObject();

    return [serializeMongooseObject(newScheduledMeetingDocument), null];
  } catch (error) {
    console.error(error);
    return [null, serializeMongooseObject(error)];
  }
}

export async function deleteScheduledMeeting(
  _id: string,
): Promise<ApiResponse<null>> {
  await dbConnect();

  try {
    const scheduledMeetingToDelete =
      await ScheduledMeetingModel.findByIdAndDelete(_id);

    if (!scheduledMeetingToDelete) {
      return [null, apiErrors.scheduledMeeting.scheduledMeetingNotFound];
    }

    return [null, null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}
