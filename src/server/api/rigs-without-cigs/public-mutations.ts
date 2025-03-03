"use server";

import { ApiResponse, ProgramSpecificQuestionsSection } from "@/types";
import authenticateServerFunction from "@/utils/authenticateServerFunction";
import apiErrors from "@/utils/constants/apiErrors";

import { updateRigsWithoutCigsInformation } from "./private-mutations";

export async function updateProgramInformation(
  programSpecificQuestionsSection: ProgramSpecificQuestionsSection,
): Promise<ApiResponse<null>> {
  const [session, authError] = await authenticateServerFunction();

  if (authError !== null) {
    return [null, authError];
  }

  if (!session.user.email) {
    return [null, apiErrors.unauthorized];
  }

  const [, updateError] = await updateRigsWithoutCigsInformation(
    session.user.email,
    programSpecificQuestionsSection,
  );

  if (updateError !== null) {
    return [null, updateError];
  }

  return [null, null];
}
