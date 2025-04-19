import { VaccineVoucherRequestModel } from "@/server/models";
import { ApiResponse, VaccineVoucherRequest } from "@/types";
import { findAll } from "@/utils/db/findAll";

export async function getAllVaccineVoucherRequests(): Promise<
  ApiResponse<VaccineVoucherRequest[]>
> {
  const [response, error] = await findAll(VaccineVoucherRequestModel, {
    populate: ["user"],
    sort: { submittedDate: -1 },
    fetchAll: true,
  });

  if (error !== null) {
    return [null, error];
  }

  return [response.results, null];
}
