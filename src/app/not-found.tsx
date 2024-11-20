import { Box } from "@mui/material";

import NotFound from "@/components/NotFound";

export default function Custom404() {
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
