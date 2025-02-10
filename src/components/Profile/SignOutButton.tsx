"use client";

import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";

export default function SignOutButton(): ReactNode {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/" })}
      variant="contained"
      color="error"
      startIcon={<LogoutIcon />}
    >
      Sign out
    </Button>
  );
}
