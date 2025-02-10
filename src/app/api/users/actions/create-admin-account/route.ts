import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from "libphonenumber-js";
import { z } from "zod";

import { createAdminUser } from "@/server/api/users/private-mutations";

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

export async function POST(request: Request) {
  try {
    const json = await request.json();

    const apiKeyHeader = request.headers.get("x-api-key");

    if (!apiKeyHeader || apiKeyHeader !== process.env.API_KEY) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid request." }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const parsedJson = adminUserRequestSchema.safeParse(json);

    if (parsedJson.success === false) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid request body." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const adminUserRequest = parsedJson.data;

    const [, error] = await createAdminUser(adminUserRequest);

    if (error !== null) {
      return new Response(JSON.stringify({ success: false, error: error }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
