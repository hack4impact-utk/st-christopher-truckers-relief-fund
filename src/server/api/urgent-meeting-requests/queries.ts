import { UrgentMeetingRequestModel } from "@/server/models";
import { ApiResponse, UrgentMeetingRequest } from "@/types";
import { findAll } from "@/utils/db/findAll";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

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
  });

  if (error !== null) {
    return [null, error];
  }

  return [serializeMongooseObject(response.results), null];
}

export async function getNumberOfUrgentMeetingRequests(): Promise<number> {
  try {
    const number = await UrgentMeetingRequestModel.countDocuments();

    return number;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
