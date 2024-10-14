import { Typography } from "@mui/material";
import { redirect } from "next/navigation";

import getUserSession from "@/utils/getUserSession";

export default async function DashboardPage() {
  const session = await getUserSession();

  if (!session) {
    throw new Error(
      "The dashboard page should be protected by a session middleware, so session should never be null",
    );
  }

  const role = session.user.role;

  switch (role) {
    case "admin":
      redirect("/dashboard/admin");
      break;
    case "client":
      redirect("/dashboard/client");
      break;
    default:
      return <Typography>Invalid role: {role}</Typography>;
  }
}
