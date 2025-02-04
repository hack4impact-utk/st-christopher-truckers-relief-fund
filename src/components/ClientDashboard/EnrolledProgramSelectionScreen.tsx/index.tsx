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

import { Program, ProgramEnrollment, User } from "@/types";

import UrgentMeetingRequestModal from "./UrgentMeetingRequestModal";

type ProgramSlugs =
  | "healthy-habits"
  | "diabetes-prevention"
  | "rigs-without-cigs"
  | "vaccine-voucher"
  | "get-preventative-screenings";

function programNameToSlug(programName: Program): ProgramSlugs {
  switch (programName) {
    case "Healthy Habits For The Long Haul":
      return "healthy-habits";
    case "Diabetes Prevention":
      return "diabetes-prevention";
    case "Rigs Without Cigs":
      return "rigs-without-cigs";
    case "Vaccine Voucher":
      return "vaccine-voucher";
    case "GPS (Get Preventative Screenings)":
      return "get-preventative-screenings";
  }
}

type EnrolledProgramsSelectionScreenProps = {
  programEnrollments: ProgramEnrollment[];
  user: User;
};

export default function EnrolledProgramsSelectionScreen({
  programEnrollments,
  user,
}: EnrolledProgramsSelectionScreenProps): ReactNode {
  const theme = useTheme();

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
      {/* Centered "Select Program" at the top */}
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

      {/* Center the program cards as well */}
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
        {programEnrollments.map((enrollment) => (
          <Link
            key={enrollment._id}
            href={`/dashboard/client/${programNameToSlug(enrollment.program)}`}
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
                borderRadius: 2, // Rounded corners
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
                    {enrollment.program}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </Box>

      <Box sx={{ marginTop: "auto", alignSelf: "center" }}>
        <UrgentMeetingRequestModal user={user} />
      </Box>
    </Box>
  );
}
