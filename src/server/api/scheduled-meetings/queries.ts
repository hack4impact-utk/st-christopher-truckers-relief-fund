import { ScheduledMeetingModel } from "@/server/models";
import { ApiResponse, ScheduledMeeting } from "@/types";
import { findAll } from "@/utils/db/findAll";

export async function getAllScheduledMeetings(): Promise<
  ApiResponse<ScheduledMeeting[]>
> {
  const [response, error] = await findAll(ScheduledMeetingModel, {
    populate: {
      path: "client",
      populate: {
        path: "enrollmentForm",
      },
    },
    sort: { date: 1 },
  });

  if (error !== null) {
    return [null, error];
  }

  return [response.results, null];
}
