import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

export default function InvalidEmailVerificationToken(): ReactNode {
  return (
    <Box
      sx={{
        width: "min(90vw, 700px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography>This link has expired</Typography>
      <Link href="/verify-email" style={{ textDecoration: "none" }}>
        <Typography color="primary">
          Click here to request a new verification link.
        </Typography>
      </Link>
    </Box>
  );
}
