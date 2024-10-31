"use client";

import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button
      onClick={() => signOut()}
      variant="contained"
      color="error"
      startIcon={<LogoutIcon />}
    >
      Sign out
    </Button>
  );
}
