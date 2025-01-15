import { Box, Divider, List, ListItem, Typography } from "@mui/material";

import { User } from "@/types";

import ChangePasswordButton from "./ChangePasswordButton";
import SignOutButton from "./SignOutButton";

type ClientSettingsProps = {
  user: User;
};

export default function ClientSettings({ user }: ClientSettingsProps) {
  if (user.role !== "client") {
    return null;
  }

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

      <Divider />
      <Typography variant="h5">Accepted Programs</Typography>
      <List>
        {user.programEnrollments.map((programEnrollment) => {
          if (programEnrollment.status === "accepted") {
            return (
              <ListItem key={programEnrollment._id}>
                <Typography variant="body1">
                  {programEnrollment.program}
                </Typography>
              </ListItem>
            );
          }
        })}
      </List>

      <ChangePasswordButton />
      <SignOutButton />
    </Box>
  );
}
