import { OldEnrollmentForm, Program } from "@/types";

export type ProgramEnrollment = {
  _id?: string;
  status: "pending" | "accepted" | "rejected";
  program: Program;
  email: string;
  enrollmentForm: OldEnrollmentForm;
  dateEnrolled: string;
};
