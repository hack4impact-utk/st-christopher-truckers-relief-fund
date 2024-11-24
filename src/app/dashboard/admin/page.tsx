import { redirect } from "next/navigation";

import getUserSession from "@/utils/getUserSession";

export default async function AdminDashboardPage() {
  const session = await getUserSession();

  if (!session || session.user.role !== "admin") {
    return redirect("/dashboard");
  }

  redirect("/dashboard/programs");
}
