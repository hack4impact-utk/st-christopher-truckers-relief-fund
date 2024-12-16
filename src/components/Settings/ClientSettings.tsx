import { Box, Typography } from "@mui/material";

import ChangePasswordButton from "@/components/Settings/ChangePasswordButton";
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
      <Typography variant="body1">
        Name: {user.firstName} {user.lastName}
      </Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      <ChangePasswordButton />
      <SignOutButton />
    </Box>
  );
}
