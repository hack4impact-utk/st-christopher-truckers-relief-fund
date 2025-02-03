import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function AdminDashboardPage(): ReactNode {
  redirect("/dashboard/admin/programs");
}
