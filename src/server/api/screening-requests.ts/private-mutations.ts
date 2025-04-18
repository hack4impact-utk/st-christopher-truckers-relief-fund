import { ScreeningRequestModel } from "@/server/models";
import { ApiResponse, ScreeningRequest } from "@/types";
import { create } from "@/utils/db/create";
import { findByIdAndDelete } from "@/utils/db/delete";
import { findOneAndUpdate } from "@/utils/db/update";

export async function createScreeningRequest(
  screeningRequest: ScreeningRequest,
): Promise<ApiResponse<ScreeningRequest>> {
  return await create(ScreeningRequestModel, screeningRequest);
}

export async function updateScreeningRequest(
  screeningRequest: ScreeningRequest,
): Promise<ApiResponse<ScreeningRequest>> {
  return await findOneAndUpdate(ScreeningRequestModel, screeningRequest);
}

export async function deleteScreeningRequest(
  screeningRequest: ScreeningRequest,
): Promise<ApiResponse<ScreeningRequest>> {
  return await findByIdAndDelete(ScreeningRequestModel, screeningRequest._id!);
}
