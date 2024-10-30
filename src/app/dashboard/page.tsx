import { Typography } from "@mui/material";
import { redirect } from "next/navigation";

import getUserSession from "@/utils/getUserSession";

export default async function DashboardPage() {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
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
