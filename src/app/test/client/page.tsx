"use client";

import { Box } from "@mui/material";
import { signOut } from "next-auth/react";

export default function ClientComponentTestPage() {
  const handleSignOut = () => {
    signOut()
      .then(() => {
        alert("Signed out");
      })
      .catch(() => {
        alert("Error signing out");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <p>Client component test page</p>
      <button onClick={handleSignOut}>Sign out</button>
    </Box>
  );
}
