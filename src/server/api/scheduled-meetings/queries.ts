import dbConnect from "@/server/dbConnect";
import { ScheduledMeetingModel } from "@/server/models";
import { ApiResponse, ScheduledMeeting } from "@/types";
import handleMongooseError from "@/utils/handleMongooseError";

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

    return [scheduledMeetings, null];
  } catch (error) {
    console.error(error);
    return [null, handleMongooseError(error)];
  }
}
