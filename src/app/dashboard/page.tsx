import { Typography } from "@mui/material";
import { redirect } from "next/navigation";

import getSession from "@/utils/getSession";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    return <Typography>You must be logged in to view this page</Typography>;
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
