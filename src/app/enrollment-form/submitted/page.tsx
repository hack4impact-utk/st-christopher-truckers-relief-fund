import { Box, Typography } from "@mui/material";
import Link from "next/link";

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
      <Typography variant="body1">
        Thank you for completing the enrollment form! We will review your
        application and get back to you soon.
      </Typography>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Typography variant="body1" color="primary">
          Return to home
        </Typography>
      </Link>
    </Box>
  );
}
