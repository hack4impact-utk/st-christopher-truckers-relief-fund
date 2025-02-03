import { redirect } from "next/navigation";
import { ReactNode } from "react";

import getUserSession from "@/utils/getUserSession";

export default async function SettingsPage(): Promise<ReactNode> {
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
  }
}
