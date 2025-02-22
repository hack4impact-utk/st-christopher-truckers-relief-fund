"use server";

import { ApiResponse, FagerstromTest } from "@/types";

import { createFagerstromTest } from "./private-mutations";

export async function handleCreateFagerstromTest(
  fagerstromTest: FagerstromTest,
): Promise<ApiResponse<null>> {
  const [, error] = await createFagerstromTest(fagerstromTest);

  if (error !== null) {
    return [null, error];
  }

  return [null, null];
}
