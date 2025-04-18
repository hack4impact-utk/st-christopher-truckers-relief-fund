import { UrgentMeetingRequestModel } from "@/server/models";
import { ApiResponse, UrgentMeetingRequest } from "@/types";
import { create } from "@/utils/db/create";
import { findByIdAndDelete } from "@/utils/db/delete";

export async function createUrgentMeetingRequest(
  urgentMeetingRequest: UrgentMeetingRequest,
): Promise<ApiResponse<UrgentMeetingRequest>> {
  return create(UrgentMeetingRequestModel, urgentMeetingRequest);
}

export async function deleteUrgentMeetingRequest(
  _id: string,
): Promise<ApiResponse<UrgentMeetingRequest>> {
  return await findByIdAndDelete(UrgentMeetingRequestModel, _id);
}
