"use server";

import { ApiResponse, UrgentMeetingRequest } from "@/types";
import authenticateServerFunction from "@/utils/authenticateServerFunction";
import apiErrors from "@/utils/constants/apiErrors";

import { sendUrgentMeetingRequestCreatedEmail } from "../emails/private-mutations";
import {
  createUrgentMeetingRequest,
  deleteUrgentMeetingRequest,
} from "./private-mutations";

export async function handleCreateUrgentMeetingRequest(
  urgentMeetingRequest: UrgentMeetingRequest,
): Promise<ApiResponse<null>> {
  const [session, authError] = await authenticateServerFunction();

  if (authError !== null) {
    return [null, authError];
  }

  if (session.user.email != urgentMeetingRequest.client.email) {
    return [null, apiErrors.unauthorized];
  }

  const [, error] = await createUrgentMeetingRequest(urgentMeetingRequest);

  if (error !== null) {
    return [null, error];
  }

  await sendUrgentMeetingRequestCreatedEmail(
    urgentMeetingRequest.client.firstName,
    urgentMeetingRequest.client.lastName,
    urgentMeetingRequest.reason,
  );

  return [null, null];
}

export async function handleDeleteUrgentMeetingRequest(
  urgentMeetingRequest: UrgentMeetingRequest,
): Promise<ApiResponse<null>> {
  const [, authError] = await authenticateServerFunction("admin");

  if (authError !== null) {
    return [null, authError];
  }

  const [, error] = await deleteUrgentMeetingRequest(urgentMeetingRequest);

  if (error !== null) {
    return [null, error];
  }

  return [null, null];
}
