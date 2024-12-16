import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";

import { Program, ProgramEnrollment } from "@/types";

function programNameToSlug(programName: Program) {
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
};

export default function EnrolledProgramsSelectionScreen({
  programEnrollments,
}: EnrolledProgramsSelectionScreenProps) {
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
        <Typography variant="h4" component="h1">
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
    </Box>
  );
}
