import { Box, Typography } from "@mui/material";

import { User } from "@/types";

import ChangePasswordButton from "./ChangePasswordButton";
import SignOutButton from "./SignOutButton";

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
      <Typography variant="body1">Email: {user.email}</Typography>
      <ChangePasswordButton />
      <SignOutButton />
    </Box>
  );
}
