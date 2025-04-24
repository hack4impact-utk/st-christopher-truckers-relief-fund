import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from "libphonenumber-js";
import { z } from "zod";

import { createAdminUser } from "@/server/api/users/private-mutations";
import {
  getFailedJsonApiResponse,
  getSuccessfulJsonApiResponse,
} from "@/utils/getJsonApiResponse";

export const dynamic = "force-dynamic";

const adminUserRequestSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email" })
    .transform((val) => val.toLowerCase()),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  phoneNumber: z
    .string()
    .refine(
      (val) => isValidPhoneNumber(val, { defaultCountry: "US" }),
      "Invalid phone number",
    )
    .transform((val) => parsePhoneNumberWithError(val, "US").number.toString()),
});

export type AdminUserRequest = z.infer<typeof adminUserRequestSchema>;

export async function POST(request: Request): Promise<Response> {
  try {
    const json = await request.json();

    const apiKeyHeader = request.headers.get("x-api-key");

    if (!apiKeyHeader || apiKeyHeader !== process.env.API_KEY) {
      return getFailedJsonApiResponse(401, "Invalid request.");
    }

    const parsedJson = adminUserRequestSchema.safeParse(json);

    if (parsedJson.success === false) {
      return getFailedJsonApiResponse(400, "Invalid request body.");
    }

    const adminUserRequest = parsedJson.data;

    const [, error] = await createAdminUser(adminUserRequest);

    if (error !== null) {
      return getFailedJsonApiResponse(
        400,
        "An error occured creating the admin account.",
      );
    }

    return getSuccessfulJsonApiResponse(200);
  } catch (error) {
    console.error(error);
    return getFailedJsonApiResponse(500, "Internal server error.");
  }
}
