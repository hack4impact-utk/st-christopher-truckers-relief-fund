import LoginForm from "@/components/LoginForm";
import { Box } from "@mui/material";

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
