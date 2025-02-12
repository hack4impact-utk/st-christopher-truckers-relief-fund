"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

import { ProgramEnrollment, User } from "@/types";
import isEnrolledInProgram from "@/utils/isEnrolledInProgram";

import UrgentMeetingRequestModal from "./UrgentMeetingRequestModal";

type EnrolledProgramsSelectionScreenProps = {
  programEnrollments: ProgramEnrollment[];
  user: User;
};

export default function EnrolledProgramsSelectionScreen({
  programEnrollments,
  user,
}: EnrolledProgramsSelectionScreenProps): ReactNode {
  const theme = useTheme();

  const enrolledInHealthyHabits = isEnrolledInProgram(
    programEnrollments,
    "Healthy Habits For The Long Haul",
  );
  const enrolledInDiabetesPrevention = isEnrolledInProgram(
    programEnrollments,
    "Diabetes Prevention",
  );
  const enrolledInHHOrDiabetes =
    enrolledInHealthyHabits || enrolledInDiabetesPrevention;

  const enrolledInRWC = isEnrolledInProgram(
    programEnrollments,
    "Rigs Without Cigs",
  );

  const enrolledInVV = isEnrolledInProgram(
    programEnrollments,
    "Vaccine Voucher",
  );

  const enrolledInGPS = isEnrolledInProgram(
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
        {enrolledInHHOrDiabetes && (
          <Link
            href="/dashboard/client/healthy-habits-and-diabetes-prevention"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card
              sx={{
                width: 300,
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.primary.main,
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardActionArea sx={{ height: "100%" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography variant="h5" textAlign="center">
                    Healthy Habits & Diabetes Prevention
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        )}

        {enrolledInRWC && (
          <Link
            href="/dashboard/client/rigs-without-cigs"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card
              sx={{
                width: 300,
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.primary.main,
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardActionArea sx={{ height: "100%" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography variant="h5" textAlign="center">
                    Rigs Without Cigs
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        )}

        {enrolledInVV && (
          <Link
            href="/dashboard/client/vaccine-voucher"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card
              sx={{
                width: 300,
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.primary.main,
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardActionArea sx={{ height: "100%" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography variant="h5" textAlign="center">
                    Vaccine Voucher
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        )}

        {enrolledInGPS && (
          <Link
            href="/dashboard/client/get-preventative-screenings"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card
              sx={{
                width: 300,
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.primary.main,
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <CardActionArea sx={{ height: "100%" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography variant="h5" textAlign="center">
                    GPS (Get Preventative Screenings)
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        )}
      </Box>

      <Box sx={{ marginTop: "auto", alignSelf: "center" }}>
        <UrgentMeetingRequestModal user={user} />
      </Box>
    </Box>
  );
}
