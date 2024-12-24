import { Box } from "@mui/material";

import ForgotPasswordForm from "@/components/ForgotPassword/ForgotPasswordForm";

export default function ForgotPasswordPage() {
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
