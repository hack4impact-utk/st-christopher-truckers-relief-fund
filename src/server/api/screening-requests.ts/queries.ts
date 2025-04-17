import { ScreeningRequestModel } from "@/server/models";
import { ApiResponse, ScreeningRequest } from "@/types";
import { findAll } from "@/utils/db/findAll";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function getAllScreeningRequests(): Promise<
  ApiResponse<ScreeningRequest[]>
> {
  const [response, error] = await findAll(ScreeningRequestModel, {
    sort: { submittedDate: -1 },
    populate: {
      path: "user",
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
