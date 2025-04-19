"use server";

import { ApiResponse, VaccineVoucherRequest } from "@/types";
import authenticateServerFunction from "@/utils/authenticateServerFunction";
import apiErrors from "@/utils/constants/apiErrors";

import {
  createVaccineVoucherRequest,
  deleteVaccineVoucherRequest,
  updateVaccineVoucherRequest,
} from "./private-mutations";

export async function handleVaccineVoucherRequestSubmission(
  vaccineVoucherRequest: VaccineVoucherRequest,
): Promise<ApiResponse<VaccineVoucherRequest>> {
  const [session, authError] = await authenticateServerFunction();

  if (authError !== null) {
    return [null, authError];
  }

  if (
    session.user.role === "client" &&
    session.user.email !== vaccineVoucherRequest.user.email
  ) {
    return [null, apiErrors.unauthorized];
  }

  const [requestInDatabase, createVaccineVoucherRequestError] =
    await createVaccineVoucherRequest(vaccineVoucherRequest);

  if (createVaccineVoucherRequestError !== null) {
    return [null, createVaccineVoucherRequestError];
  }

  return [requestInDatabase, null];
}

export async function handleVaccineVoucherRequestDeletion(
  vaccineVoucherRequest: VaccineVoucherRequest,
): Promise<ApiResponse<null>> {
  const [session, authError] = await authenticateServerFunction();

  if (authError !== null) {
    return [null, authError];
  }

  if (
    session.user.role === "client" &&
    session.user.email !== vaccineVoucherRequest.user.email
  ) {
    return [null, apiErrors.unauthorized];
  }

  const [, deleteVaccineVoucherRequestError] =
    await deleteVaccineVoucherRequest(vaccineVoucherRequest);

  if (deleteVaccineVoucherRequestError !== null) {
    return [null, deleteVaccineVoucherRequestError];
  }

  return [null, null];
}

export async function handleVaccineVoucherRequestUpdate(
  vaccineVoucherRequest: VaccineVoucherRequest,
): Promise<ApiResponse<null>> {
  const [session, authError] = await authenticateServerFunction();

  if (authError !== null) {
    return [null, authError];
  }

  if (
    session.user.role === "client" &&
    session.user.email !== vaccineVoucherRequest.user.email
  ) {
    return [null, apiErrors.unauthorized];
  }

  const [, updateVaccineVoucherRequestError] =
    await updateVaccineVoucherRequest(vaccineVoucherRequest);

  if (updateVaccineVoucherRequestError !== null) {
    return [null, updateVaccineVoucherRequestError];
  }

  return [null, null];
}
