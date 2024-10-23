import { Box, Button, Container, Paper } from "@mui/material";
import Link from "next/link";

import LoginForm from "@/components/LoginForm";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div>
      {/* Header with Logo and Title */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            p: 1, // Material UI spacing
          }}
        >
          <Logo width={100} height={100} alt="SCF Logo" />
        </Box>
        <h1>St. Christopher Truckers Relief Fund</h1>
      </header>

      {/* Login Form with Black Border */}
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper sx={{ p: 3, border: "2px solid black" }}>
          <LoginForm />
        </Paper>
      </Container>
      {/* Enrollment Form Button */}
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Link href="/enrollment-form" passHref>
          <Button variant="contained" color="primary">
            Fill out enrollment form
          </Button>
        </Link>
      </Box>
    </div>
  );
}
