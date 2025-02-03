import { ReactNode } from "react";

import { EnrollmentFormProvider } from "@/providers/EnrollmentFormProvider";

type EnrollmentFormLayoutProps = {
  children: React.ReactNode;
};

export default function EnrollmentFormLayout({
  children,
}: EnrollmentFormLayoutProps): ReactNode {
  return <EnrollmentFormProvider>{children}</EnrollmentFormProvider>;
}
