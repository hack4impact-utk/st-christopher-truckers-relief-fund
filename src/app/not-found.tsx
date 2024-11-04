import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Custom404(): JSX.Element {
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
        The page you are looking for does not exist.
      </Typography>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Typography variant="body1" color="primary">
          Return to home
        </Typography>
      </Link>
    </Box>
  );
}
