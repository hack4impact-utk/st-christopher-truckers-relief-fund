import { z } from "zod";

import { sendZoomReminderEmail } from "@/server/api/emails/private-mutations";

const sendZoomReminderEmailRequestSchema = z.object({
  recipientEmail: z.string().email({ message: "Invalid email" }),
  meetingName: z.string(),
  meetingLink: z.string(),
});

export type SendZoomReminderEmailRequest = z.infer<
  typeof sendZoomReminderEmailRequestSchema
>;

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

    const parsedJson = sendZoomReminderEmailRequestSchema.safeParse(json);

    if (parsedJson.success === false) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid request body." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const sendZoomReminderEmailRequest = parsedJson.data;

    await sendZoomReminderEmail(sendZoomReminderEmailRequest);

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
