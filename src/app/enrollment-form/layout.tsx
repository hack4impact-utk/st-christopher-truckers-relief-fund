import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { EnrollmentFormProvider } from "@/providers/EnrollmentFormProvider";
import getUserSession from "@/utils/getUserSession";

type EnrollmentFormLayoutProps = {
  children: React.ReactNode;
};

export default async function EnrollmentFormLayout({
  children,
}: Readonly<EnrollmentFormLayoutProps>): Promise<ReactNode> {
  const session = await getUserSession();

  if (session) {
    redirect("/dashboard");
  }

  return <EnrollmentFormProvider>{children}</EnrollmentFormProvider>;
}
