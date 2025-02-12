import dbConnect from "@/server/dbConnect";
import { ScheduledMeetingModel } from "@/server/models";
import { ApiResponse, ScheduledMeeting } from "@/types";
import handleMongooseError from "@/utils/handleMongooseError";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function getAllScheduledMeetings(): Promise<
  ApiResponse<ScheduledMeeting[]>
> {
  await dbConnect();

  try {
    const scheduledMeetings = await ScheduledMeetingModel.find()
      .populate({
        path: "client",
        populate: {
          path: "enrollmentForm",
        },
      })
      .sort({ date: 1 })
      .lean<ScheduledMeeting[]>()
      .exec();

    return [serializeMongooseObject(scheduledMeetings), null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}
