"use server";

import { ApiResponse, ClientUser, HealthyHabitsTrackingForm } from "@/types";
import authenticateServerFunction from "@/utils/authenticateServerFunction";
import apiErrors from "@/utils/constants/apiErrors";

import {
  createHealthyHabitsTrackingForm,
  deleteHealthyHabitsTrackingForm,
} from "./private-mutations";

export async function handleHealthyHabitsTrackingFormSubmission(
  healthyHabitsTrackingForm: HealthyHabitsTrackingForm,
): Promise<ApiResponse<HealthyHabitsTrackingForm>> {
  const [session, authError] = await authenticateServerFunction();

  if (authError !== null) {
    return [null, authError];
  }

  if (
    session.user.role === "client" &&
    session.user.email !== healthyHabitsTrackingForm.user.email
  ) {
    return [null, apiErrors.unauthorized];
  }

  const [formInDatabase, createError] = await createHealthyHabitsTrackingForm(
    healthyHabitsTrackingForm,
  );

  if (createError !== null) {
    return [null, createError];
  }

  return [formInDatabase, null];
}

export async function handleHealthyHabitsTrackingFormDeletion(
  healthyHabitsTrackingForm: HealthyHabitsTrackingForm,
  user: ClientUser,
): Promise<ApiResponse<null>> {
  const [session, authError] = await authenticateServerFunction();

  if (authError !== null) {
    return [null, authError];
  }

  if (session.user.role === "client" && session.user.email !== user.email) {
    return [null, apiErrors.unauthorized];
  }

  const [, error] = await deleteHealthyHabitsTrackingForm(
    healthyHabitsTrackingForm,
  );

  if (error !== null) {
    return [null, error];
  }

  return [null, null];
}
