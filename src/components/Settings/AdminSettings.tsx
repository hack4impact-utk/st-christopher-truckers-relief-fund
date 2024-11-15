import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

import SignOutButton from "@/components/Settings/SignOutButton";

type AdminSettingsProps = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

export default function AdminSettings({ user }: AdminSettingsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h4">Admin Settings</Typography>
      <Typography variant="body1">
        Name: {user.firstName} {user.lastName}
      </Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      <Link href="/change-password" passHref>
        <Button variant="contained" color="primary">
          Reset Password
        </Button>
      </Link>
      <SignOutButton />
    </Box>
  );
}
