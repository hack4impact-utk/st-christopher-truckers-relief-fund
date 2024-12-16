import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";

import { ProgramEnrollment } from "@/types";

type EnrolledProgramsSelectionScreenProps = {
  programEnrollments: ProgramEnrollment[];
};

// Utility function to create a route-friendly slug from a program name
function programToSlug(programName: string) {
  return programName.toLowerCase().replace(/\s+/g, "-");
}

function EnrolledProgramsSelectionScreen({
  programEnrollments,
}: EnrolledProgramsSelectionScreenProps): JSX.Element {
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
            href={`/dashboard/client/${programToSlug(enrollment.program)}`}
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

export default EnrolledProgramsSelectionScreen;
