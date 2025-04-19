import { ScheduledMeetingModel } from "@/server/models";
import { ApiResponse, ScheduledMeeting } from "@/types";
import { create } from "@/utils/db/create";
import { findByIdAndDelete } from "@/utils/db/delete";

export async function createScheduledMeeting(
  scheduledMeeting: ScheduledMeeting,
): Promise<ApiResponse<ScheduledMeeting>> {
  return await create(ScheduledMeetingModel, scheduledMeeting, {
    populate: ["client"],
  });
}

export async function deleteScheduledMeeting(
  _id: string,
): Promise<ApiResponse<ScheduledMeeting>> {
  return await findByIdAndDelete(ScheduledMeetingModel, _id);
}
