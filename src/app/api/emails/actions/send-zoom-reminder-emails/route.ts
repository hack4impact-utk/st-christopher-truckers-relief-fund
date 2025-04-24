import { sendZoomReminderEmail } from "@/server/api/emails/private-mutations";
import { getUsersByProgram } from "@/server/api/users/private-mutations";
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
          "https://google.com",
          email,
        ),
      ),
    );

    await Promise.allSettled(
      diabetesPreventionOnlyEmails.map((email) =>
        sendZoomReminderEmail(
          "Diabetes Prevention",
          "https://google.com",
          email,
        ),
      ),
    );

    await Promise.allSettled(
      emailsInBoth.map((email) =>
        sendZoomReminderEmail(
          "Healthy Habits & Diabetes Prevention",
          "https://google.com",
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
