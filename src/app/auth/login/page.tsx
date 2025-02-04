import { Box } from "@mui/material";
import { ReactNode } from "react";

import LoginForm from "@/components/LoginForm";

export default function LoginPage(): ReactNode {
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
