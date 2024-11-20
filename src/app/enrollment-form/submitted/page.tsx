import { Box } from "@mui/material";

import SubmittedFormSection from "@/components/EnrollmentForm/SubmittedFormSection";

export default function SubmittedPage() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SubmittedFormSection />
    </Box>
  );
}
