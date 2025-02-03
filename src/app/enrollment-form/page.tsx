import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function EnrollmentFormPage(): ReactNode {
  redirect("/enrollment-form/general-information");
}
