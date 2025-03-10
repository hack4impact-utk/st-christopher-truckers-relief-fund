import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { ProgramEnrollment, User } from "@/types";
import isEnrolledInProgram from "@/utils/isEnrolledInProgram";

import ProgramCard from "./ProgramCard";
import UrgentMeetingRequestModal from "./UrgentMeetingRequestModal";

type EnrolledProgramsSelectionScreenProps = {
  programEnrollments: ProgramEnrollment[];
  user: User;
};

export default function EnrolledProgramsSelectionScreen({
  programEnrollments,
  user,
}: Readonly<EnrolledProgramsSelectionScreenProps>): ReactNode {
  const enrolledInHealthyHabits = isEnrolledInProgram(
    programEnrollments,
    "Healthy Habits For The Long Haul",
  );
  const enrolledInDiabetesPrevention = isEnrolledInProgram(
    programEnrollments,
    "Diabetes Prevention",
  );
  const enrolledInHealthyHabitsOrDiabetesPrevention =
    enrolledInHealthyHabits || enrolledInDiabetesPrevention;

  const enrolledInRigsWithoutCigs = isEnrolledInProgram(
    programEnrollments,
    "Rigs Without Cigs",
  );

  const enrolledInVaccineVoucher = isEnrolledInProgram(
    programEnrollments,
    "Vaccine Voucher",
  );

  const enrolledInGetPreventativeScreenings = isEnrolledInProgram(
    programEnrollments,
    "GPS (Get Preventative Screenings)",
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 4,
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          marginTop: 12,
          marginBottom: 1,
        }}
      >
        <Typography variant="h5" component="h1">
          Select Program
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          alignItems: "flex-start",
          justifyContent: "center",
          margin: 4,
        }}
      >
        {enrolledInHealthyHabitsOrDiabetesPrevention && (
          <ProgramCard
            title="Healthy Habits & Diabetes Prevention"
            href="/dashboard/client/healthy-habits-and-diabetes-prevention"
          />
        )}

        {enrolledInRigsWithoutCigs && (
          <ProgramCard
            title="Rigs Without Cigs"
            href="/dashboard/client/rigs-without-cigs"
          />
        )}

        {enrolledInVaccineVoucher && (
          <ProgramCard
            title="Vaccine Voucher"
            href="/dashboard/client/vaccine-voucher"
          />
        )}

        {enrolledInGetPreventativeScreenings && (
          <ProgramCard
            title="Get Preventative Screenings"
            href="/dashboard/client/get-preventative-screenings"
          />
        )}
      </Box>

      <Box sx={{ marginTop: "auto", alignSelf: "center" }}>
        <UrgentMeetingRequestModal user={user} />
      </Box>
    </Box>
  );
}
