import { sendDailyZoomReminderEmail } from "@/server/api/emails/private-mutations";
import { getFeatureFlag } from "@/server/api/feature-flags/queries";
import { getUsersWithMeetingsToday } from "@/server/api/users/private-mutations";
import { FEATURE_FLAGS } from "@/utils/constants/featureFlag";
import {
  getFailedJsonApiResponse,
  getSuccessfulJsonApiResponse,
} from "@/utils/getJsonApiResponse";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  try {
    const apiKeyHeader = request.headers.get("x-api-key");

    if (!apiKeyHeader || apiKeyHeader !== process.env.API_KEY) {
      return getFailedJsonApiResponse(401, "Invalid request.");
    }

    const isAutomaticJobsEnabled = await getFeatureFlag(
      FEATURE_FLAGS.AUTOMATIC_JOBS.IS_AUTOMATIC_JOBS_ENABLED,
    );

    if (!isAutomaticJobsEnabled) {
      console.error(
        "Automatic jobs are not enabled, so daily scheduled meeting reminders will not be sent.",
      );

      return getFailedJsonApiResponse(500, "Automatic jobs are not enabled.");
    }

    const [usersWithMeetings, error] = await getUsersWithMeetingsToday();

    if (error !== null) {
      return getFailedJsonApiResponse(500, "Internal server error.");
    }

    await Promise.allSettled(
      usersWithMeetings.map(({ user, meeting }) =>
        sendDailyZoomReminderEmail(
          user.email,
          new Date(meeting.date).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            timeZoneName: "short",
          }),
        ),
      ),
    );

    return getSuccessfulJsonApiResponse(200);
  } catch (error) {
    console.error(error);
    return getFailedJsonApiResponse(500, "Internal server error.");
  }
}
