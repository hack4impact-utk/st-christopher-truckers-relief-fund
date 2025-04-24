import { getNumberOfUrgentMeetingRequests } from "@/server/api/urgent-meeting-requests/queries";
import {
  getFailedJsonApiResponse,
  getSuccessfulJsonApiResponse,
} from "@/utils/getJsonApiResponse";
import getUserSession from "@/utils/getUserSession";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const session = await getUserSession();

  if (!session || session.user.role !== "admin") {
    return getFailedJsonApiResponse(401, "Unauthorized");
  }

  try {
    const numberOfUrgentMeetingRequests =
      await getNumberOfUrgentMeetingRequests();

    const responseJson = {
      numberOfUrgentMeetingRequests,
    };

    return getSuccessfulJsonApiResponse(200, responseJson);
  } catch {
    return getFailedJsonApiResponse(500, "Internal server error");
  }
}
