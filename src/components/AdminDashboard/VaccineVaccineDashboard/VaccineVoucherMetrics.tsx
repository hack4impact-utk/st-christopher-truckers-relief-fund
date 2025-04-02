"use client";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

import { ProgramEnrollment, VaccineVoucherRequest } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

import AdminDashboardTable, {
  AdminDashboardTableRow,
} from "../AdminDashboardTable";
import YearlyTrendChart from "../GetPreventativeScreeningsDashboard/GetPreventativeScreeningsMetrics/YearlyTrendChart";

type VaccineVoucherMetricsProps = {
  vaccineVoucherProgramEnrollments: ProgramEnrollment[];
  vaccineVoucherRequests: VaccineVoucherRequest[];
};

type VoucherMetrics = {
  totalRequests: number;
  totalRegistered: number;
  totalReceived: number;
  totalUsed: number;
};

type YearlyData = {
  year: number;
  totalRequests: number;
  totalRegistered: number;
  totalReceived: number;
  totalUsed: number;
};

function isRegistered(status: string): boolean {
  return status === "requested" || status === "approved";
}
function isReceived(status: string): boolean {
  return status === "received";
}
function isUsed(status: string): boolean {
  return status === "used";
}

function calculateMetrics(
  voucherRequests: VaccineVoucherRequest[],
): VoucherMetrics {
  return voucherRequests.reduce<VoucherMetrics>(
    (acc, request) => {
      acc.totalRequests++;
      if (isRegistered(request.status)) acc.totalRegistered++;
      if (isReceived(request.status)) acc.totalReceived++;
      if (isUsed(request.status)) acc.totalUsed++;
      return acc;
    },
    {
      totalRequests: 0,
      totalRegistered: 0,
      totalReceived: 0,
      totalUsed: 0,
    },
  );
}

/** Filter requests for the last month, then calculate metrics. */
function getMonthlyData(
  voucherRequests: VaccineVoucherRequest[],
): VoucherMetrics {
  const currentMonth = dayjsUtil().startOf("month");
  const lastMonth = currentMonth.subtract(1, "month");

  const thisMonthsRequests = voucherRequests.filter((request) => {
    const requestDate = dayjsUtil(request.submittedDate);
    return requestDate.isAfter(lastMonth);
  });
  return calculateMetrics(thisMonthsRequests);
}

/** Build an array of yearly data for line charts. */
function getYearlyData(voucherRequests: VaccineVoucherRequest[]): YearlyData[] {
  if (voucherRequests.length === 0) return [];

  const currentYear = dayjsUtil().year();
  const earliestYear = Math.min(
    ...voucherRequests.map((req) => dayjsUtil(req.submittedDate).year()),
  );
  const years = Array.from(
    { length: currentYear - earliestYear + 1 },
    (_, i) => earliestYear + i,
  );

  return years
    .map((year) => {
      const yearStart = dayjsUtil().year(year).startOf("year");
      const yearEnd = yearStart.endOf("year");

      const requestsThisYear = voucherRequests.filter((req) => {
        const date = dayjsUtil(req.submittedDate);
        return date.isAfter(yearStart) && date.isBefore(yearEnd);
      });

      const metrics = calculateMetrics(requestsThisYear);
      return {
        year,
        ...metrics,
      };
    })
    .reverse();
}

/** Group requests by `vaccineName` so we can display each vaccine in its own table. */
function groupRequestsByVaccine(
  voucherRequests: VaccineVoucherRequest[],
): Record<string, VaccineVoucherRequest[]> {
  return voucherRequests.reduce(
    (acc, request) => {
      const vaccine = request.vaccineName;
      if (!acc[vaccine]) {
        acc[vaccine] = [];
      }
      acc[vaccine].push(request);
      return acc;
    },
    {} as Record<string, VaccineVoucherRequest[]>,
  );
}

type VaccineRequestTableRow = AdminDashboardTableRow & {
  vaccineName: string;
  status: string;
};

function toRequestTableRow(req: VaccineVoucherRequest): VaccineRequestTableRow {
  return {
    id:
      req._id ??
      `${req.user.lastName}-${req.user.firstName}-${req.vaccineName}`,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    phoneNumber: req.user.phoneNumber,
    email: req.user.email,
    vaccineName: req.vaccineName,
    status: req.status,
  };
}

export default function VaccineVoucherMetrics({
  vaccineVoucherProgramEnrollments,
  vaccineVoucherRequests,
}: Readonly<VaccineVoucherMetricsProps>): ReactNode {
  const totalEnrolled = vaccineVoucherProgramEnrollments.length;
  const registrationsInPast3Months = vaccineVoucherProgramEnrollments.reduce(
    (acc, enrollment) => {
      const registrationDate = dayjsUtil(enrollment.dateEnrolled);
      if (registrationDate.diff(dayjsUtil(), "month") > -3) acc++;
      return acc;
    },
    0,
  );

  // Monthly + Yearly metrics
  const monthlyMetrics = getMonthlyData(vaccineVoucherRequests);
  const yearlyData = getYearlyData(vaccineVoucherRequests);

  const chartDataTotal = yearlyData.map((item) => ({
    year: item.year,
    value: item.totalRequests,
  }));
  const chartDataRegistered = yearlyData.map((item) => ({
    year: item.year,
    value: item.totalRegistered,
  }));
  const chartDataReceived = yearlyData.map((item) => ({
    year: item.year,
    value: item.totalReceived,
  }));
  const chartDataUsed = yearlyData.map((item) => ({
    year: item.year,
    value: item.totalUsed,
  }));

  // Group requests by vaccine name
  const groupedByVaccine = groupRequestsByVaccine(vaccineVoucherRequests);

  return (
    <Box>
      <Typography align="center" variant="h4" sx={{ m: 2 }}>
        Vaccine Voucher Metrics
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            borderRadius: 2,
            boxShadow: 3,
            padding: 4,
          }}
        >
          <Typography>
            <strong>Total Enrolled:</strong> {totalEnrolled}
          </Typography>
          <Typography>
            <strong>Registrations in Past 3 Months:</strong>{" "}
            {registrationsInPast3Months}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          This Month&apos;s Metrics
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Metric</TableCell>
                <TableCell align="right">Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Total Requests</TableCell>
                <TableCell align="right">
                  {monthlyMetrics.totalRequests}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Registered</TableCell>
                <TableCell align="right">
                  {monthlyMetrics.totalRegistered}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Received</TableCell>
                <TableCell align="right">
                  {monthlyMetrics.totalReceived}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Used</TableCell>
                <TableCell align="right">{monthlyMetrics.totalUsed}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          Requests per Vaccine
        </Typography>
        {Object.keys(groupedByVaccine).length === 0 ? (
          <Typography align="center">
            No vaccine voucher requests found.
          </Typography>
        ) : (
          Object.entries(groupedByVaccine).map(([vaccineName, requests]) => {
            const tableRows = requests.map(toRequestTableRow);
            const { totalRegistered, totalReceived, totalUsed } =
              calculateMetrics(requests);

            return (
              <Box sx={{ mb: 4 }} key={vaccineName}>
                <AdminDashboardTable
                  tableName={`Vaccine: ${vaccineName}`}
                  rows={tableRows}
                  additionalColumns={[
                    {
                      field: "vaccineName",
                      headerName: "Vaccine",
                      flex: 1,
                      minWidth: 150,
                    },
                    {
                      field: "status",
                      headerName: "Status",
                      flex: 1,
                      minWidth: 120,
                    },
                  ]}
                  width="100%"
                />

                <Box sx={{ mt: 1, ml: 1 }}>
                  <Typography variant="body2">
                    <strong>Totals for {vaccineName}:</strong>
                    &nbsp;Requested: {totalRegistered}, &nbsp;Received:{" "}
                    {totalReceived}, &nbsp;Used: {totalUsed}
                  </Typography>
                </Box>
              </Box>
            );
          })
        )}
      </Box>

      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Yearly Voucher Request Trends
        </Typography>
        <YearlyTrendChart
          title="Total Requests"
          data={chartDataTotal}
          color="#1976d2"
        />
        <YearlyTrendChart
          title="Registered"
          data={chartDataRegistered}
          color="#2e7d32"
        />
        <YearlyTrendChart
          title="Received"
          data={chartDataReceived}
          color="#ed6c02"
        />
        <YearlyTrendChart title="Used" data={chartDataUsed} color="#9c27b0" />
      </Box>
    </Box>
  );
}
