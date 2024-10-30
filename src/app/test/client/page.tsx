"use client";

import { Box } from "@mui/material";
import { signOut } from "next-auth/react";

import { changePassword } from "@/server/api/users/mutations";

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

  const handleChangePassword = async () => {
    const email = "pateltrishu28@gmail";
    const oldPassword = "password1";
    const newPassword = "password123";

    const [, error] = await changePassword(email, oldPassword, newPassword);

    console.log(error);
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
      <button onClick={handleChangePassword}>Change Password</button>
    </Box>
  );
}
