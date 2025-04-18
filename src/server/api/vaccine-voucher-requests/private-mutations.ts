import { VaccineVoucherRequestModel } from "@/server/models";
import { ApiResponse, VaccineVoucherRequest } from "@/types";
import { create } from "@/utils/db/create";
import { findByIdAndDelete } from "@/utils/db/delete";
import { findOneAndUpdate } from "@/utils/db/update";

export async function createVaccineVoucherRequest(
  vaccineVoucherRequest: VaccineVoucherRequest,
): Promise<ApiResponse<VaccineVoucherRequest>> {
  return await create(VaccineVoucherRequestModel, vaccineVoucherRequest);
}

export async function updateVaccineVoucherRequest(
  vaccineVoucherRequest: VaccineVoucherRequest,
): Promise<ApiResponse<VaccineVoucherRequest>> {
  return await findOneAndUpdate(
    VaccineVoucherRequestModel,
    vaccineVoucherRequest,
  );
}

export async function deleteVaccineVoucherRequest(
  vaccineVoucherRequest: VaccineVoucherRequest,
): Promise<ApiResponse<VaccineVoucherRequest>> {
  return await findByIdAndDelete(
    VaccineVoucherRequestModel,
    vaccineVoucherRequest._id!,
  );
}
