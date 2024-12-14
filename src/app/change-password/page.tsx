import { Box } from "@mui/material";

import ChangePasswordForm from "@/components/ChangePassword/ChangePasswordForm";

export default async function ForgotPasswordPage() {
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
      <ChangePasswordForm />
    </Box>
  );
}
