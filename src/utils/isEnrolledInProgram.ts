import { Program, ProgramEnrollment } from "@/types";

export default function isEnrolledInProgram(
  programEnrollments: ProgramEnrollment[],
  program: Program,
) {
  return programEnrollments
    .filter((programEnrollment) => programEnrollment.status === "accepted")
    .some((programEnrollment) => programEnrollment.program === program);
}
