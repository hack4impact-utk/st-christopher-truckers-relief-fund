// components/EnrolledProgramsSelectionScreen.tsx
import { FC } from "react";
import { Box, Typography, Card, CardActionArea, CardContent } from "@mui/material";
import { ProgramEnrollment } from "@/types";

interface EnrolledProgramsSelectionScreenProps {
  programEnrollments: ProgramEnrollment[];
  onSelectProgram?: (program: string) => void;
}

const EnrolledProgramsSelectionScreen: FC<EnrolledProgramsSelectionScreenProps> = ({
  programEnrollments,
  onSelectProgram,
}) => {
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Left Section */}
      <Box
        sx={{
          flex: 2,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Select Program
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {programEnrollments.map((enrollment) => (
            <Card
              key={enrollment._id}
              sx={{ width: 200, cursor: "pointer" }}
              onClick={() => onSelectProgram?.(enrollment.program)}
            >
              <CardActionArea>
                <CardContent>
                  <Typography variant="h6">{enrollment.program}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Right Section (Sidebar) */}
      <Box
        sx={{
          flex: 1,
          padding: 4,
          borderLeft: "1px solid #ccc",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Select a Program
        </Typography>
        {programEnrollments.map((enrollment) => (
          <Box
            key={`${enrollment._id}-sidebar`}
            sx={{
              border: "1px solid #ccc",
              padding: 2,
              marginBottom: 1,
              cursor: "pointer",
            }}
            onClick={() => onSelectProgram?.(enrollment.program)}
          >
            <Typography variant="body1">{enrollment.program}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default EnrolledProgramsSelectionScreen;
