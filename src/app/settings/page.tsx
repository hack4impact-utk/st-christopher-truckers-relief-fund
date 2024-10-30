import { Typography } from "@mui/material";
import { redirect } from "next/navigation";

import getUserSession from "@/utils/getUserSession";

export default async function SettingsPage() {
  const session = await getUserSession();

  if (!session) {
    redirect("/");
  }

  switch (session.user.role) {
    case "admin":
      redirect("/settings/admin");
      break;
    case "client":
      redirect("/settings/client");
      break;
    default:
      return <Typography>Invalid role: {session.user.role}</Typography>;
  }
}
