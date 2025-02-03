import { Box } from "@mui/material";
import { ReactNode } from "react";

import DisqualifiedFormSection from "@/components/EnrollmentForm/DisqualifiedFormSection";

export default function DisqualifiedPage(): ReactNode {
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
