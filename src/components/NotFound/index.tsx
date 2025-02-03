import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

export default function NotFound(): ReactNode {
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
      <Typography>The page you are looking for does not exist.</Typography>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Typography color="primary">Return to home</Typography>
      </Link>
    </Box>
  );
}
