"use server";

import { ApiResponse, ScheduledMeeting } from "@/types";
import authenticateServerFunction from "@/utils/authenticateServerFunction";
import dayjsUtil from "@/utils/dayjsUtil";

import { sendScheduledMeetingEmail } from "../emails/private-mutations";
import {
  createScheduledMeeting,
  deleteScheduledMeeting,
} from "./private-mutations";

export async function handleCreateScheduledMeeting(
  scheduledMeeting: ScheduledMeeting,
): Promise<ApiResponse<ScheduledMeeting>> {
  const [, authError] = await authenticateServerFunction("admin");

  if (authError !== null) {
    return [null, authError];
  }

  const [scheduledMeetingInDatabase, createScheduledMeetingError] =
    await createScheduledMeeting(scheduledMeeting);

  if (createScheduledMeetingError !== null) {
    return [null, createScheduledMeetingError];
  }

  await sendScheduledMeetingEmail(
    scheduledMeetingInDatabase.client.email,
    dayjsUtil(scheduledMeetingInDatabase.date).format(
      "MM/DD/YYYY [at] hh:mm A",
    ),
    scheduledMeetingInDatabase.reason,
  );

  return [scheduledMeetingInDatabase, null];
}

export async function handleDeleteScheduledMeeting(
  _id: string,
): Promise<ApiResponse<null>> {
  const [, authError] = await authenticateServerFunction("admin");

  if (authError !== null) {
    return [null, authError];
  }

  const [, deleteScheduledMeetingError] = await deleteScheduledMeeting(_id);

  if (deleteScheduledMeetingError !== null) {
    return [null, deleteScheduledMeetingError];
  }

  return [null, null];
}
