import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

import SignOutButton from "@/components/Settings/SignOutButton";
import { User } from "@/types";

type ClientSettingsProps = {
  user: User;
};

export default function ClientSettings({ user }: ClientSettingsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h4">Client Settings</Typography>
      <Typography>
        Name: {user.firstName} {user.lastName}
      </Typography>
      <Typography>Email: {user.email}</Typography>
      <Link href="/change-password" passHref>
        <Button variant="contained" color="primary">
          Reset Password
        </Button>
      </Link>
      <SignOutButton />
    </Box>
  );
}
