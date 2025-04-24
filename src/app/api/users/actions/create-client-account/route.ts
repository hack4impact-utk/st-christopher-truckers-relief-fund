import { createEnrollmentForm } from "@/server/api/enrollment-forms/private-mutations";
import { createClientUser } from "@/server/api/users/private-mutations";
import { ClientUser } from "@/types";
import {
  getFailedJsonApiResponse,
  getSuccessfulJsonApiResponse,
} from "@/utils/getJsonApiResponse";

import {
  addProgramEnrollmentsToClientUser,
  clientCreationRequestSchema,
  getEnrollmentForm,
} from "./helpers";

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<Response> {
  try {
    const apiKeyHeader = request.headers.get("x-api-key");

    if (!apiKeyHeader || apiKeyHeader !== process.env.API_KEY) {
      return getFailedJsonApiResponse(401, "Invalid request.");
    }

    const json = await request.json();

    const parsedJson = clientCreationRequestSchema.safeParse(json);

    if (parsedJson.success === false) {
      console.error(parsedJson.error);
      return getFailedJsonApiResponse(
        400,
        "Invalid request body: " + parsedJson.error,
      );
    }

    const randomSixteenCharacterPassword = Math.random()
      .toString(36)
      .slice(-16);

    const enrollmentForm = getEnrollmentForm(
      parsedJson.data,
      randomSixteenCharacterPassword,
    );

    const [enrollmentFormInDatabase, enrollmentFormInDatabaseError] =
      await createEnrollmentForm(enrollmentForm);

    if (enrollmentFormInDatabaseError !== null) {
      return getFailedJsonApiResponse(
        500,
        "Internal server error creating enrollment form: " +
          enrollmentFormInDatabaseError,
      );
    }

    const user: ClientUser = {
      firstName: enrollmentForm.generalInformationSection.firstName,
      lastName: enrollmentForm.generalInformationSection.lastName,
      email: enrollmentForm.generalInformationSection.email,
      phoneNumber: enrollmentForm.generalInformationSection.phoneNumber,
      dateOfBirth: enrollmentForm.generalInformationSection.dateOfBirth,
      sex: enrollmentForm.generalInformationSection.sex,
      password: randomSixteenCharacterPassword,
      role: "client",
      dateCreated: new Date().toISOString(),
      isEmailVerified: true,
      enrollmentForm: enrollmentFormInDatabase,
      programEnrollments: [],
      healthyHabitsTrackingForms: [],
      rigsWithoutCigsStatus: "unknown",
      fagerstromTests: [],
      screeningRequests: [],
      vaccineVoucherRequests: [],
      comments: "",
      goals: "",
      needsInformationUpdated: true,
    };

    const [userInDatabase, userInDatabaseError] = await createClientUser(user);

    if (userInDatabaseError !== null) {
      return getFailedJsonApiResponse(
        500,
        "Internal server error creating user: " + userInDatabaseError,
      );
    }

    // create program enrollments
    await addProgramEnrollmentsToClientUser(parsedJson.data, userInDatabase);

    return getSuccessfulJsonApiResponse(200);
  } catch (error) {
    console.error(error);
    return getFailedJsonApiResponse(
      500,
      "Unknown Internal server error: " + error,
    );
  }
}
