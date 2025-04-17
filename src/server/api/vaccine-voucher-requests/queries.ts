import { VaccineVoucherRequestModel } from "@/server/models";
import { ApiResponse, VaccineVoucherRequest } from "@/types";
import { findAll } from "@/utils/db/findAll";
import { serializeMongooseObject } from "@/utils/serializeMongooseObject";

export async function getAllVaccineVoucherRequests(): Promise<
  ApiResponse<VaccineVoucherRequest[]>
> {
  const [response, error] = await findAll(VaccineVoucherRequestModel, {
    populate: ["user"],
    sort: { submittedDate: -1 },
  });

  if (error !== null) {
    return [null, error];
  }

  return [serializeMongooseObject(response.results), null];
}
