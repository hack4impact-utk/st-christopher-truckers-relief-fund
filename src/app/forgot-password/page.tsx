import { Box } from "@mui/material";
import { ReactNode } from "react";

import ForgotPasswordForm from "@/components/ForgotPassword/ForgotPasswordForm";

export default function ForgotPasswordPage(): ReactNode {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ForgotPasswordForm />
    </Box>
  );
}
