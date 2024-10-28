import { Box, Button, Container, Paper } from "@mui/material";
import Link from "next/link";

import Logo from "@/components/Logo";

export default function Custom404(): JSX.Element {
  return (
    <div>
      {/* Header with Logo and Title*/}
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
            p: 0, // Material UI spacing
          }}
        >
          <Logo width={100} height={100} alt="SCF Logo" />
        </Box>
        <h1>404- Page Not Found</h1>
      </header>
      {/* Message and Button to Return to Home*/}
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper sx={{ p: 3, border: "2px solid black", textAlign: "center" }}>
          <p>Oops! The page you are looking for does not exist.</p>
          <Link href="/" passHref>
            <Button variant="contained" color="primary">
              Go Back to Home
            </Button>
          </Link>
        </Paper>
      </Container>
    </div>
  );
}
