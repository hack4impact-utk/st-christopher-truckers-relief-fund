import { Box, Typography } from "@mui/material";

import { getUsers } from "@/server/api/users/queries";

export default async function AdminClientsPage() {
  const [users, error] = await getUsers({});

  console.log(users);

  if (error !== null) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>
          There was an error fetching pending applications
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Admin Clients Page</Typography>
    </Box>
  );
}
