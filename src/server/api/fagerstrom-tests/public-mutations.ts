"use server";

import { ApiResponse, FagerstromTest, User } from "@/types";
import authenticateServerFunction from "@/utils/authenticateServerFunction";
import apiErrors from "@/utils/constants/apiErrors";

import {
  createFagerstromTest,
  deleteFagerstromTest,
} from "./private-mutations";

export async function handleCreateFagerstromTest(
  fagerstromTest: FagerstromTest,
): Promise<ApiResponse<FagerstromTest>> {
  const [session, authError] = await authenticateServerFunction();

  if (authError !== null) {
    return [null, authError];
  }

  if (
    session.user.role === "client" &&
    session.user.email !== fagerstromTest.client.email
  ) {
    return [null, apiErrors.unauthorized];
  }

  const [formInDatabase, createError] =
    await createFagerstromTest(fagerstromTest);

  if (createError !== null) {
    return [null, createError];
  }
  return [formInDatabase, null];
}

export async function handleFagerstromTestDeletion(
  fagerstromTest: FagerstromTest,
  client: User,
): Promise<ApiResponse<null>> {
  fagerstromTest.client = client;
  const [session, authError] = await authenticateServerFunction();

  if (authError !== null) {
    return [null, authError];
  }

  if (session.user.role === "client" && session.user.email !== client.email) {
    return [null, apiErrors.unauthorized];
  }

  fagerstromTest.client = client;
  const [, error] = await deleteFagerstromTest(fagerstromTest);

  if (error !== null) {
    return [null, error];
  }

  return [null, null];
}
