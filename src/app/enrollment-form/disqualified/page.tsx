import { Box } from "@mui/material";

import DisqualifiedFormSection from "@/components/EnrollmentForm/DisqualifiedFormSection";

export default function DisqualifiedPage() {
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
      <DisqualifiedFormSection />
    </Box>
  );
}
