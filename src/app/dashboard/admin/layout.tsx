import { redirect } from "next/navigation";

import getUserSession from "@/utils/getUserSession";

type AdminDashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  const session = await getUserSession();

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
