import { Program } from "@/types";

export type ProgramEnrollment = {
  _id?: string;
  status: "pending" | "enrolled";
  program: Program;
  email: string;
  dateEnrolled: string;
};
