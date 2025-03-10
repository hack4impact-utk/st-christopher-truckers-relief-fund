"use client";

import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ReactNode, useState } from "react";

import ClientProgramManagementForm from "@/components/AdminDashboard/ClientManagementDashboard/ClientProgramManagementForm";
import PendingApplicationInfoModal from "@/components/AdminDashboard/PendingApplicationDashboard/PendingApplicationInfoModal/";
import { ClientUser, ProgramEnrollment } from "@/types";

import AdminDashboardTable, {
  AdminDashboardTableRow,
} from "../AdminDashboardTable";

export type ClientsRow = AdminDashboardTableRow & {
  programEnrollments: ProgramEnrollment[];
  client: ClientUser;
};

const createRowFromClient = (client: ClientUser): ClientsRow => {
  return {
    id: client._id,
    lastName: client.lastName,
    firstName: client.firstName,
    phoneNumber: client.phoneNumber,
    email: client.email,
    programEnrollments: client.programEnrollments,
    client,
  };
};

function getRows(clients: ClientUser[]): ClientsRow[] {
  return clients.map(createRowFromClient);
}

type ClientManagementDashboardProps = {
  clients: ClientUser[];
};

export default function ClientManagementDashboard({
  clients,
}: Readonly<ClientManagementDashboardProps>): ReactNode {
  const [rows] = useState(getRows(clients));

  const additionalColumns: GridColDef<ClientsRow>[] = [
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      minWidth: 350,
      flex: 1,
      renderCell: (params): ReactNode => {
        const client = params.row.client;
        const fullName = client.firstName + " " + client.lastName;
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              height: "100%",
            }}
          >
            <PendingApplicationInfoModal
              enrollmentForm={client.enrollmentForm}
            />
            <ClientProgramManagementForm
              programEnrollments={params.row.programEnrollments}
              client={client}
              fullName={fullName}
            />
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: "95%", height: "75%", marginTop: "100px" }}>
      <AdminDashboardTable
        tableName="Clients"
        rows={rows}
        additionalColumns={additionalColumns}
      />
    </Box>
  );
}
