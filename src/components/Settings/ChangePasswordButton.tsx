import { Button } from "@mui/material";
import Link from "next/link";

export default function ChangePasswordButton() {
  return (
    <Link href="/change-password" passHref>
      <Button variant="contained" color="primary">
        Change Password
      </Button>
    </Link>
  );
}
