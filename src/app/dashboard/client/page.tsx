import { redirect } from "next/navigation";

import getUserSession from "@/utils/getUserSession";

export default async function ClientDashboardPage() {
  const session = await getUserSession();

  if (!session || session.user.role !== "client") {
    return redirect("/dashboard");
  }

  return <p>Client dashboard page</p>;
}
