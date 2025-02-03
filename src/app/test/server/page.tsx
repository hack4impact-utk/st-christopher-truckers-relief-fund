import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function ServerComponentTestPage(): ReactNode {
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
      <Typography>Server component test page</Typography>
    </Box>
  );
}
