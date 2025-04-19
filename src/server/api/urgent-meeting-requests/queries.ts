import { UrgentMeetingRequestModel } from "@/server/models";
import { ApiResponse, UrgentMeetingRequest } from "@/types";
import { findAll } from "@/utils/db/findAll";

export async function getAllUrgentMeetingRequests(): Promise<
  ApiResponse<UrgentMeetingRequest[]>
> {
  const [response, error] = await findAll(UrgentMeetingRequestModel, {
    populate: {
      path: "client",
      populate: {
        path: "enrollmentForm",
      },
    },
    fetchAll: true,
  });

  if (error !== null) {
    return [null, error];
  }

  return [response.results, null];
}

export async function getNumberOfUrgentMeetingRequests(): Promise<number> {
  const [urgentMeetingRequests, error] = await getAllUrgentMeetingRequests();

  if (error !== null) {
    return 0;
  }

  return urgentMeetingRequests.length;
}
