"use server";

import { ApiResponse, ScreeningRequest } from "@/types";
import authenticateServerFunction from "@/utils/authenticateServerFunction";
import apiErrors from "@/utils/constants/apiErrors";

import {
  createScreeningRequest,
  deleteScreeningRequest,
  updateScreeningRequest,
} from "./private-mutations";

export async function handleScreeningRequestSubmission(
  screeningRequest: ScreeningRequest,
): Promise<ApiResponse<null>> {
  const [session, authError] = await authenticateServerFunction();

  if (authError !== null) {
    return [null, authError];
  }

  if (session.user.email !== screeningRequest.user.email) {
    return [null, apiErrors.unauthorized];
  }

  const [, createScreeningRequestError] =
    await createScreeningRequest(screeningRequest);

  if (createScreeningRequestError !== null) {
    return [null, createScreeningRequestError];
  }

  return [null, null];
}

export async function handleScreeningRequestDeletion(
  screeningRequest: ScreeningRequest,
): Promise<ApiResponse<null>> {
  const [session, authError] = await authenticateServerFunction();

  if (authError !== null) {
    return [null, authError];
  }

  if (
    session.user.role === "client" &&
    session.user.email !== screeningRequest.user.email
  ) {
    return [null, apiErrors.unauthorized];
  }

  const [, deleteScreeningRequestError] =
    await deleteScreeningRequest(screeningRequest);

  if (deleteScreeningRequestError !== null) {
    return [null, deleteScreeningRequestError];
  }

  return [null, null];
}

export async function handleScreeningRequestUpdate(
  screeningRequest: ScreeningRequest,
): Promise<ApiResponse<null>> {
  const [session, authError] = await authenticateServerFunction();

  if (authError !== null) {
    return [null, authError];
  }

  if (
    session.user.role === "client" &&
    session.user.email !== screeningRequest.user.email
  ) {
    return [null, apiErrors.unauthorized];
  }

  const [, updateScreeningRequestError] =
    await updateScreeningRequest(screeningRequest);

  if (updateScreeningRequestError !== null) {
    return [null, updateScreeningRequestError];
  }

  return [null, null];
}
