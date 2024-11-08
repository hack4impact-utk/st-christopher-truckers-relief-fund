import { useContext } from "react";

import { EnrollmentFormContext } from "@/providers/EnrollmentFormProvider";

export default function useEnrollmentForm() {
  const context = useContext(EnrollmentFormContext);

  if (!context) {
    throw new Error(
      "useEnrollmentForm must be used within an EnrollmentFormProvider",
    );
  }

  return context;
}
