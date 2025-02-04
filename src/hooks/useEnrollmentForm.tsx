import { useContext } from "react";

import {
  EnrollmentFormContext,
  EnrollmentFormContextType,
} from "@/providers/EnrollmentFormProvider";

export default function useEnrollmentForm(): EnrollmentFormContextType {
  const context = useContext(EnrollmentFormContext);

  if (!context) {
    throw new Error(
      "useEnrollmentForm must be used within an EnrollmentFormProvider",
    );
  }

  return context;
}
