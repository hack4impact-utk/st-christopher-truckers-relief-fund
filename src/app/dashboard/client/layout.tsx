import { redirect } from "next/navigation";

import getUserSession from "@/utils/getUserSession";

type ClientDashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function ClientDashboardLayout({
  children,
}: ClientDashboardLayoutProps) {
  const session = await getUserSession();

  if (!session || session.user.role !== "client") {
    redirect("/dashboard");
  }

  if (!session.user.emailVerified) {
    redirect("/verify-email");
  }

  return <>{children}</>;
}
