import { sendZoomReminderEmail } from "@/server/api/emails/private-mutations";
import { getFeatureFlag } from "@/server/api/feature-flags/queries";
import { getUsersByProgram } from "@/server/api/users/private-mutations";
import { FEATURE_FLAGS } from "@/utils/constants/featureFlag";
import {
  getFailedJsonApiResponse,
  getSuccessfulJsonApiResponse,
} from "@/utils/getJsonApiResponse";

export const dynamic = "force-dynamic";

const ZOOM_LINK = process.env.ZOOM_LINK;

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
        "Automatic jobs are not enabled, so zoom reminder emails will not be sent.",
      );

      return getFailedJsonApiResponse(500, "Automatic jobs are not enabled.");
    }

    const [healthyHabitsUsers, healthyHabitsError] = await getUsersByProgram(
      "Healthy Habits For The Long Haul",
    );
    const [diabetesPreventionUsers, diabetesPreventionError] =
      await getUsersByProgram("Diabetes Prevention");

    if (healthyHabitsError !== null || diabetesPreventionError !== null) {
      return getFailedJsonApiResponse(500, "Internal server error.");
    }

    const healthyHabitsEmails = healthyHabitsUsers.map((user) => user.email);
    const diabetesPreventionEmails = diabetesPreventionUsers.map(
      (user) => user.email,
    );

    const emailsInBoth = healthyHabitsEmails.filter((email) =>
      diabetesPreventionEmails.includes(email),
    );

    const healthyHabitsOnlyEmails = healthyHabitsEmails.filter(
      (email) => !diabetesPreventionEmails.includes(email),
    );
    const diabetesPreventionOnlyEmails = diabetesPreventionEmails.filter(
      (email) => !healthyHabitsEmails.includes(email),
    );

    await Promise.allSettled(
      healthyHabitsOnlyEmails.map((email) =>
        sendZoomReminderEmail(
          "Healthy Habits For The Long Haul",
          ZOOM_LINK,
          email,
        ),
      ),
    );

    await Promise.allSettled(
      diabetesPreventionOnlyEmails.map((email) =>
        sendZoomReminderEmail("Diabetes Prevention", ZOOM_LINK, email),
      ),
    );

    await Promise.allSettled(
      emailsInBoth.map((email) =>
        sendZoomReminderEmail(
          "Healthy Habits & Diabetes Prevention",
          ZOOM_LINK,
          email,
        ),
      ),
    );

    return getSuccessfulJsonApiResponse(200);
  } catch (error) {
    console.error(error);
    return getFailedJsonApiResponse(500, "Internal server error.");
  }
}
