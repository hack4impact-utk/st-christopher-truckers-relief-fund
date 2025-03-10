import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { User } from "@/types";

import ChangePasswordButton from "./ChangePasswordButton";
import SignOutButton from "./SignOutButton";

type AdminProfileProps = {
  user: User;
};

export default function AdminProfile({
  user,
}: Readonly<AdminProfileProps>): ReactNode {
  if (user.role !== "admin") {
    return null;
  }

  return (
    <Box
      sx={{
        width: "min(90vw, 700px)",
        boxShadow: 3,
        borderRadius: 2,
        padding: 4,
      }}
    >
      <Typography variant="h4" textAlign="center">
        Admin Profile
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </Typography>
        <Typography>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography>
          <strong>Phone Number:</strong> {user.phoneNumber}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 4,
        }}
      >
        <ChangePasswordButton />
        <SignOutButton />
      </Box>
    </Box>
  );
}
