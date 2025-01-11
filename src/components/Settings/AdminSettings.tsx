import { Box, Typography } from "@mui/material";

import { User } from "@/types";

import ChangePasswordButton from "./ChangePasswordButton";
import SignOutButton from "./SignOutButton";

type AdminSettingsProps = {
  user: User;
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
      <Typography>
        Name: {user.firstName} {user.lastName}
      </Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      <ChangePasswordButton />
      <SignOutButton />
    </Box>
  );
}
