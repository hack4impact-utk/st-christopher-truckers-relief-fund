import dbConnect from "@/server/dbConnect";
import { ScheduledMeetingModel } from "@/server/models";
import { ApiResponse, ScheduledMeeting } from "@/types";
import { findByIdAndDelete } from "@/utils/db/delete";
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
    return [null, handleMongooseError(error)];
  }
}

export async function deleteScheduledMeeting(
  _id: string,
): Promise<ApiResponse<null>> {
  const [, error] = await findByIdAndDelete(ScheduledMeetingModel, _id);

  if (error !== null) {
    return [null, error];
  }

  return [null, null];
}
