import { EnrollmentFormProvider } from "@/providers/EnrollmentFormProvider";

type EnrollmentFormLayoutProps = {
  children: React.ReactNode;
};

export default function EnrollmentFormLayout({
  children,
}: EnrollmentFormLayoutProps) {
  return <EnrollmentFormProvider>{children}</EnrollmentFormProvider>;
}
