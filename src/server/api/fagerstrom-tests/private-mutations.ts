import { FagerstromTestModel } from "@/server/models";
import { ApiResponse, FagerstromTest } from "@/types";
import { create } from "@/utils/db/create";
import { findByIdAndDelete } from "@/utils/db/delete";

export async function createFagerstromTest(
  fagerstromTest: FagerstromTest,
): Promise<ApiResponse<FagerstromTest>> {
  return create(FagerstromTestModel, fagerstromTest, { populate: ["client"] });
}

export async function deleteFagerstromTest(
  fagerstromTest: FagerstromTest,
): Promise<ApiResponse<FagerstromTest>> {
  return await findByIdAndDelete(FagerstromTestModel, fagerstromTest._id!);
}
