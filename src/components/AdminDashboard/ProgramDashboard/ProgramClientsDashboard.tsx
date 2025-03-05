"use client";

import Search from "@mui/icons-material/Search";
import { Box, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ReactNode, useState } from "react";

export type ProgramClientsDashboardRow = {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type ProgramClientsDashboardProps<RowType extends ProgramClientsDashboardRow> =
  {
    programName: string;
    rows: RowType[];
    additionalColumns?: GridColDef<RowType>[];
  };

export default function ProgramClientsDashboard<
  RowType extends ProgramClientsDashboardRow,
>({
  programName,
  rows,
  additionalColumns,
}: ProgramClientsDashboardProps<RowType>): ReactNode {
  const [searchQuery, setSearchQuery] = useState("");

  const baseColumns: GridColDef<RowType>[] = [
    {
      field: "firstName",
      headerName: "First name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "lastName",
      headerName: "Last name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "phoneNumber",
      headerName: "Phone number",
      flex: 1,
      minWidth: 125,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
      minWidth: 200,
    },
  ];

  const columns = [...baseColumns, ...(additionalColumns || [])];

  const filteredRows = rows.filter(
    (row) =>
      row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Box>
      <Typography align="center" variant="h6">
        {programName} Clients
      </Typography>
      <Box display="flex" alignItems="center" sx={{ py: 2 }}>
        <TextField
          id="search-bar"
          className="text"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Search..."
          size="small"
        />
        <Search sx={{ fontSize: 28, m: 1 }} color="primary" />
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        sx={{ height: "300px" }}
      />
    </Box>
  );
}
