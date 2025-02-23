"use server";

import { ApiResponse, FagerstromTest, User } from "@/types";

import {
  createFagerstromTest,
  deleteFagerstromTest,
} from "./private-mutations";

export async function handleCreateFagerstromTest(
  fagerstromTest: FagerstromTest,
): Promise<ApiResponse<null>> {
  const [, error] = await createFagerstromTest(fagerstromTest);

  if (error !== null) {
    return [null, error];
  }

  return [null, null];
}

export async function handleFagerstromTestDeletion(
  fagerstromTest: FagerstromTest,
  client: User,
): Promise<ApiResponse<null>> {
  fagerstromTest.client = client;
  const [, error] = await deleteFagerstromTest(fagerstromTest);

  if (error !== null) {
    return [null, error];
  }

  return [null, null];
}
