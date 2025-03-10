"use client";

import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ReactNode } from "react";

import { ClientUser, ProgramEnrollment } from "@/types";

import AdminDashboardTable, {
  AdminDashboardTableRow,
} from "../AdminDashboardTable";
import VaccineVoucherHistoryModal from "./VaccineVoucherHistoryModal";

type VaccineVoucherClientsRow = AdminDashboardTableRow & {
  user: ClientUser;
};

const createRowFromVaccineVoucherProgramEnrollment = (
  programEnrollment: ProgramEnrollment,
): VaccineVoucherClientsRow => {
  const user = programEnrollment.user as ClientUser;

  return {
    id: programEnrollment._id,
    lastName: user.lastName,
    firstName: user.firstName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    user,
  };
};

function getRows(
  programEnrollments: ProgramEnrollment[],
): VaccineVoucherClientsRow[] {
  return programEnrollments.map(createRowFromVaccineVoucherProgramEnrollment);
}

type VaccineVoucherClientDashboardProps = {
  vaccineVoucherProgramEnrollments: ProgramEnrollment[];
};

export default function VaccineVoucherClientDashboard({
  vaccineVoucherProgramEnrollments: VaccineVoucherProgramEnrollments,
}: Readonly<VaccineVoucherClientDashboardProps>): ReactNode {
  const rows = getRows(VaccineVoucherProgramEnrollments);

  const additionalColumns: GridColDef<VaccineVoucherClientsRow>[] = [
    {
      field: "History",
      headerName: "History",
      flex: 1,
      minWidth: 100,
      renderCell: (params): ReactNode => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: 2,
              alignItems: "center",
              height: "100%",
            }}
          >
            <VaccineVoucherHistoryModal
              initialVaccineVoucherRequests={
                params.row.user.vaccineVoucherRequests
              }
            />
          </Box>
        );
      },
    },
  ];

  return (
    <AdminDashboardTable
      tableName="Vaccine Voucher Clients"
      rows={rows}
      additionalColumns={additionalColumns}
    />
  );
}
