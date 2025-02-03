import { Box } from "@mui/material";
import { ReactNode } from "react";

import NotFound from "@/components/NotFound";

export default function NotFoundPage(): ReactNode {
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
      <NotFound />
    </Box>
  );
}
