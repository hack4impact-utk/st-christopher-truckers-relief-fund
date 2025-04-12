"use client";

import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import { Dispatch, ReactNode, SetStateAction } from "react";

import { AdminDashboardTableRow } from "../AdminDashboardTable";

type PaginationModel = {
  page: number;
  pageSize: number;
};

type PaginatedAdminDashboardTableProps<RowType extends AdminDashboardTableRow> =
  {
    tableName: string;
    additionalColumns?: GridColDef<RowType>[];
    width?: string;
    actionButtons?: React.ReactNode;

    // to handle server side pagination and sorting
    rows: RowType[];
    rowCount: number;

    paginationModel: PaginationModel;
    setPaginationModel: Dispatch<SetStateAction<PaginationModel>>;

    sortModel: GridSortModel;
    setSortModel: Dispatch<SetStateAction<GridSortModel>>;

    setSearchQuery: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
  };

export default function PaginatedAdminDashboardTable<
  RowType extends AdminDashboardTableRow,
>({
  tableName,
  additionalColumns = [],
  width,
  actionButtons,
  rows,
  rowCount,
  paginationModel,
  setPaginationModel,
  sortModel,
  setSortModel,
  setSearchQuery,
  isLoading,
}: Readonly<PaginatedAdminDashboardTableProps<RowType>>): ReactNode {
  const baseColumns: GridColDef<RowType>[] = [
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
  ];

  const columns = [...baseColumns, ...(additionalColumns || [])];

  return (
    <Box>
      <Typography align="center" variant="h6">
        {tableName}
      </Typography>
      <Box
        sx={{
          width: width ?? "100%",
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
          {actionButtons && (
            <Box sx={{ marginLeft: "auto" }}>{actionButtons}</Box>
          )}
        </Box>
        <DataGrid
          rows={rows}
          rowCount={rowCount}
          columns={columns}
          loading={isLoading}
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
  );
}
