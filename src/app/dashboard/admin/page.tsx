import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage(): ReactNode {
  redirect("/dashboard/admin/programs");
}
