import { Box } from "@mui/material";

import ForgotPasswordComponent from "@/components/ForgotPasswordComponent";
import { SearchParams } from "@/types";

export default async function ForgotPasswordPage({
  searchParams,
}: SearchParams) {
  const { token } = await searchParams;

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
      <ForgotPasswordComponent token={token} />
    </Box>
  );
}
