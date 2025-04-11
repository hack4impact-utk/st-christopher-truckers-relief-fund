import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import { getPaginatedClients } from "@/server/api/users/queries";

export default async function ServerComponentTestPage(): Promise<ReactNode> {
  const [response, error] = await getPaginatedClients({
    page: 0,
    pageSize: 10,
    sortField: "lastName",
    sortOrder: "desc",
    search: "",
    options: {
      populateEnrollmentForm: true,
      populateProgramEnrollments: true,
      populateHealthyHabitsTrackingForms: true,
    },
  });

  if (error !== null) {
    return <>{error}</>;
  }

  const [clients, count] = response;

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography>Clients: {count}</Typography>
      {clients.map((client) => (
        <Typography key={client._id}>
          {client.firstName} {client.lastName} {client.email}{" "}
          {client.phoneNumber}
        </Typography>
      ))}
    </Box>
  );
}
