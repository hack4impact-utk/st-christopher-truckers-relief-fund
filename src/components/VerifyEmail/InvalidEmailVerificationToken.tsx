import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function InvalidEmailVerificationToken() {
  return (
    <Box sx={{ width: "min(90vw, 700px)", textAlign: "center" }}>
      <Typography variant="body1">This link has expired</Typography>
      <Link href="/verify-email" style={{ textDecoration: "none" }}>
        <Typography variant="body1" color="primary">
          Click here to request a new verification link.
        </Typography>
      </Link>
    </Box>
  );
}
