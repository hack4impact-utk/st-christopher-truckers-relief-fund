import { sendZoomReminderEmail } from "@/server/api/emails/private-mutations";
import { getUsersByProgram } from "@/server/api/users/private-mutations";

export async function POST(request: Request): Promise<Response> {
  try {
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

    const programName = "Healthy Habits For The Long Haul";
    const [users, usersError] = await getUsersByProgram(programName);

    if (usersError !== null) {
      return new Response(
        JSON.stringify({ success: false, error: "Internal server error." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    await Promise.all(
      users.map((user) =>
        sendZoomReminderEmail(
          "Healthy Habits For The Long Haul",
          "https://google.com",
          user.email,
        ),
      ),
    );

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
