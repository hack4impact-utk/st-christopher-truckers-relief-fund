import { Box } from "@mui/material";

import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
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
      <LoginForm />
    </Box>
  );
}
