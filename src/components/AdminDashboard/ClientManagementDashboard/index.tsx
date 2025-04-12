"use client";

import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";

import ClientProgramManagementForm from "@/components/AdminDashboard/ClientManagementDashboard/ClientProgramManagementForm";
import PendingApplicationInfoModal from "@/components/AdminDashboard/EnrollmentFormResponseModal";
import { useDebounce } from "@/hooks/useDebounce";
import { ClientUser, ProgramEnrollment } from "@/types";

import { AdminDashboardTableRow } from "../AdminDashboardTable";

export type ClientsRow = AdminDashboardTableRow & {
  programEnrollments: ProgramEnrollment[];
  client: ClientUser;
};

export const createRowFromClient = (client: ClientUser): ClientsRow => {
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

export default function ClientManagementDashboard(): ReactNode {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [rows, setRows] = useState<ClientsRow[]>([]);

  const sortField = sortModel[0]?.field;
  const sortOrder = sortModel[0]?.sort;

  const { data, isPending, isError } = useQuery({
    queryKey: [
      "paginatedClients",
      paginationModel,
      debouncedSearchQuery,
      sortField,
      sortOrder,
    ],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      let apiUrl = `/api/users?page=${paginationModel.page}&pageSize=${paginationModel.pageSize}`;
      if (debouncedSearchQuery) {
        apiUrl += `&search=${debouncedSearchQuery}`;
      }
      if (sortField) {
        apiUrl += `&sortField=${sortField}`;
      }
      if (sortOrder) {
        apiUrl += `&sortOrder=${sortOrder}`;
      }
      const response = await fetch(apiUrl);
      return await response.json();
    },
  });

  useEffect(() => {
    setRows(getRows(data?.data?.clients ?? []));
  }, [data]);

  const columns: GridColDef<ClientsRow>[] = [
    {
      field: "firstName",
      headerName: "First name",
      flex: 1,
      minWidth: 150,
      filterable: false,
    },
    {
      field: "lastName",
      headerName: "Last name",
      flex: 1,
      minWidth: 150,
      filterable: false,
    },
    {
      field: "phoneNumber",
      headerName: "Phone number",
      flex: 1,
      minWidth: 125,
      filterable: false,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
      minWidth: 200,
      filterable: false,
    },
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      minWidth: 350,
      flex: 1,
      filterable: false,
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
              setRows={setRows}
            />
          </Box>
        );
      },
    },
  ];

  if (isError) {
    return (
      <Typography>
        There was an error fetching the clients. Please try again later.
      </Typography>
    );
  }

  const rowCount = data?.data?.count ?? 0;

  return (
    <Box sx={{ width: "95%", height: "75%", marginTop: "100px" }}>
      <Box>
        <Typography align="center" variant="h6">
          Clients
        </Typography>
        <Box
          sx={{
            marginInline: "auto",
          }}
        >
          <Box display="flex" alignItems="center" sx={{ py: 2 }}>
            <TextField
              id="search-bar"
              placeholder="Search..."
              size="small"
              onChange={(e) => {
                setPaginationModel((prev) => ({
                  page: 0,
                  pageSize: prev.pageSize,
                }));
                setSearchQuery(e.target.value);
              }}
            />
            <SearchIcon sx={{ fontSize: 28, m: 1 }} color="primary" />
          </Box>
          <DataGrid
            rows={rows}
            rowCount={rowCount}
            columns={columns}
            loading={isPending}
            paginationMode="server"
            pageSizeOptions={[5, 10, 20, 50, 100]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sortingMode="server"
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            disableRowSelectionOnClick
            sx={{ height: "500px" }}
          />
        </Box>
      </Box>
    </Box>
  );
}
