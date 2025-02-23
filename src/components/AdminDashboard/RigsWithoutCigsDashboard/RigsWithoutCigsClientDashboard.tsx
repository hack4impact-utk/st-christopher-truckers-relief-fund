import { Search } from "@mui/icons-material";
import { Box, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ReactNode, useState } from "react";

import { ClientUser, FagerstromTest, ProgramEnrollment, User } from "@/types";

import FagerstromTestHistoryModal from "./FagerstromTestHistoryModal";

type Row = {
  id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  fagerstromTests: FagerstromTest[];
  programEnrollment: ProgramEnrollment;
  user: User;
};

const createRowFromRigsWithoutCigsProgramEnrollment = (
  programEnrollment: ProgramEnrollment,
): Row => {
  const user = programEnrollment.user as ClientUser;

  return {
    id: programEnrollment._id,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    fagerstromTests: user.fagerstromTests,
    programEnrollment,
    user,
  };
};

function getRows(programEnrollments: ProgramEnrollment[]): Row[] {
  return programEnrollments.map(createRowFromRigsWithoutCigsProgramEnrollment);
}

type RigsWithoutCigsClientDashboardProps = {
  rigsWithoutCigsProgramEnrollments: ProgramEnrollment[];
};

export default function RigsWithoutCigsClientDashboard({
  rigsWithoutCigsProgramEnrollments,
}: RigsWithoutCigsClientDashboardProps): ReactNode {
  const rows = getRows(rigsWithoutCigsProgramEnrollments);
  const [searchQuery, setSearchQuery] = useState("");

  const columns: GridColDef<Row>[] = [
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
      headerName: "Phone Number",
      flex: 1,
      minWidth: 125,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "history",
      headerName: "View history",
      sortable: false,
      align: "center",
      flex: 1,
      minWidth: 100,
      renderCell: (params): ReactNode => {
        return (
          <FagerstromTestHistoryModal
            initialFagerstromTests={params.row.fagerstromTests}
            programEnrollment={params.row.programEnrollment}
            user={params.row.user}
          />
        );
      },
    },
  ];

  const filteredRows = rows.filter(
    (row) =>
      row.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <Box>
        <Typography align="center" variant="h6">
          Rigs Without Cigs Clients
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
          sx={{
            height: "300px",
          }}
        />
      </Box>
    </>
  );
}
