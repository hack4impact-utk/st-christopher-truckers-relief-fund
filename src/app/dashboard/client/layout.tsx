import { redirect } from "next/navigation";
import { ReactNode } from "react";

import getUserSession from "@/utils/getUserSession";

type ClientDashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function ClientDashboardLayout({
  children,
}: ClientDashboardLayoutProps): Promise<ReactNode> {
  const session = await getUserSession();

  if (!session || session.user.role !== "client") {
    redirect("/dashboard");
  }

  if (!session.user.isEmailVerified) {
    redirect("/verify-email");
  }

  return <>{children}</>;
}
