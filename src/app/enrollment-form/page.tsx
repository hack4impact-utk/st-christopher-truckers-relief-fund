import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default function EnrollmentFormPage(): ReactNode {
  redirect("/enrollment-form/general-information");
}
