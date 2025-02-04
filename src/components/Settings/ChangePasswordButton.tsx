import { Button } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

export default function ChangePasswordButton(): ReactNode {
  return (
    <Link href="/change-password" passHref>
      <Button variant="contained" color="primary">
        Change Password
      </Button>
    </Link>
  );
}
