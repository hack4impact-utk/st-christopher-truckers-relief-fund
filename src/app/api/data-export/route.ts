import { exportData } from "@/server/api/data-export/queries";
import getUserSession from "@/utils/getUserSession";

export async function POST(request: Request): Promise<Response> {
  try {
    const session = await getUserSession();

    if (!session || session?.user.role !== "admin") {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized." }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const bodyText = request.body ? await request.text() : null;
    if (!bodyText) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid request body." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const tables = JSON.parse(bodyText).collections;
    const file = await exportData(tables);

    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
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
