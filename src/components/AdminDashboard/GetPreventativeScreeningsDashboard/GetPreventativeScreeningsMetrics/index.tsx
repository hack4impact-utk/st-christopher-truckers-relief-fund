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

import { ProgramEnrollment, ScreeningRequest } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

import YearlyTrendChart from "./YearlyTrendChart";

type GetPreventativeScreeningsMetricsProps = {
  getPreventativeScreeningsProgramEnrollments: ProgramEnrollment[];
  screeningRequests: ScreeningRequest[];
};

type ScreeningMetrics = {
  totalRegistrations: number;
  colorectalRegistered: number;
  colorectalQualified: number;
  prostateRegistered: number;
  prostateQualified: number;
  cervicalRegistered: number;
  cervicalQualified: number;
};

type YearlyData = {
  year: number;
  totalRegistrations: number;
  colorectalRegistered: number;
  colorectalQualified: number;
  prostateRegistered: number;
  prostateQualified: number;
  cervicalRegistered: number;
  cervicalQualified: number;
};

function isRequestQualified(request: ScreeningRequest): boolean {
  const status = request.status;

  return (
    status === "qualified" ||
    status === "initial positive" ||
    status === "true positive" ||
    status === "false positive" ||
    status === "negative"
  );
}

function calculateMetrics(
  screeningRequests: ScreeningRequest[],
): ScreeningMetrics {
  return screeningRequests.reduce(
    (acc, request) => {
      acc.totalRegistrations++;

      switch (request.name) {
        case "Colon / Colorectal Screening":
          acc.colorectalRegistered++;
          if (isRequestQualified(request)) acc.colorectalQualified++;
          break;
        case "Prostate Screening":
          acc.prostateRegistered++;
          if (isRequestQualified(request)) acc.prostateQualified++;
          break;
        case "Cervical Cancer Screening":
          acc.cervicalRegistered++;
          if (isRequestQualified(request)) acc.cervicalQualified++;
          break;
      }

      return acc;
    },
    {
      totalRegistrations: 0,
      colorectalRegistered: 0,
      colorectalQualified: 0,
      prostateRegistered: 0,
      prostateQualified: 0,
      cervicalRegistered: 0,
      cervicalQualified: 0,
    },
  );
}

function getMonthlyData(
  screeningRequests: ScreeningRequest[],
): ScreeningMetrics {
  const currentMonth = dayjsUtil().startOf("month");
  const lastMonth = currentMonth.subtract(1, "month");

  const thisMonthsRequests = screeningRequests.filter((request) => {
    const requestDate = dayjsUtil(request.submittedDate);
    return requestDate.isAfter(lastMonth);
  });

  return calculateMetrics(thisMonthsRequests);
}

function getYearlyData(screeningRequests: ScreeningRequest[]): YearlyData[] {
  if (screeningRequests.length === 0) {
    return [];
  }

  const currentYear = dayjsUtil().year();
  const earliestYear = Math.min(
    ...screeningRequests.map((request) =>
      dayjsUtil(request.submittedDate).year(),
    ),
  );

  const years = Array.from(
    { length: currentYear - earliestYear + 1 },
    (_, i) => earliestYear + i,
  );

  const yearlyData = years
    .map((year) => {
      const yearStart = dayjsUtil().year(year).startOf("year");
      const yearEnd = yearStart.endOf("year");

      const yearRequests = screeningRequests.filter((request) => {
        const requestDate = dayjsUtil(request.submittedDate);
        return requestDate.isAfter(yearStart) && requestDate.isBefore(yearEnd);
      });

      const metrics = calculateMetrics(yearRequests);
      return {
        year,
        ...metrics,
      };
    })
    .reverse();

  return yearlyData;
}

export default function GetPreventativeScreeningsMetrics({
  getPreventativeScreeningsProgramEnrollments,
  screeningRequests,
}: Readonly<GetPreventativeScreeningsMetricsProps>): ReactNode {
  const totalEnrolled = getPreventativeScreeningsProgramEnrollments.length;
  const registrationsInPast3Months =
    getPreventativeScreeningsProgramEnrollments.reduce(
      (acc, programEnrollment) => {
        const registrationDate = dayjsUtil(programEnrollment.dateEnrolled);
        if (registrationDate.diff(dayjsUtil(), "month") > -3) acc++;

        return acc;
      },
      0,
    );

  const monthlyMetrics = getMonthlyData(screeningRequests);
  const yearlyData = getYearlyData(screeningRequests);

  const chartData = yearlyData.map((data) => ({
    year: data.year,
    total: data.totalRegistrations,
    colorectal: data.colorectalRegistered,
    colorectalQualified: data.colorectalQualified,
    prostate: data.prostateRegistered,
    prostateQualified: data.prostateQualified,
    cervical: data.cervicalRegistered,
    cervicalQualified: data.cervicalQualified,
  }));

  return (
    <Box>
      <Typography align="center" variant="h4" sx={{ m: 2 }}>
        Get Preventative Screenings Metrics
      </Typography>

      {/* Summary Box */}
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

      {/* Monthly Metrics Table */}
      <Box>
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
                <TableCell>Total Registrations</TableCell>
                <TableCell align="right">
                  {monthlyMetrics.totalRegistrations}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Colorectal Screening Registered</TableCell>
                <TableCell align="right">
                  {monthlyMetrics.colorectalRegistered}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Colorectal Screening Qualified</TableCell>
                <TableCell align="right">
                  {monthlyMetrics.colorectalQualified}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Prostate Screening Registered</TableCell>
                <TableCell align="right">
                  {monthlyMetrics.prostateRegistered}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Prostate Screening Qualified</TableCell>
                <TableCell align="right">
                  {monthlyMetrics.prostateQualified}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cervical Screening Registered</TableCell>
                <TableCell align="right">
                  {monthlyMetrics.cervicalRegistered}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cervical Screening Qualified</TableCell>
                <TableCell align="right">
                  {monthlyMetrics.cervicalQualified}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Line Charts */}
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Yearly Screening Trends
        </Typography>
        <YearlyTrendChart
          title="Total Registrations"
          data={chartData.map((item) => ({
            year: item.year,
            value: item.total,
          }))}
          color="#1976d2"
        />
        <YearlyTrendChart
          title="Colorectal Screening - Registered"
          data={chartData.map((item) => ({
            year: item.year,
            value: item.colorectal,
          }))}
          color="#2e7d32"
        />
        <YearlyTrendChart
          title="Colorectal Screening - Qualified"
          data={chartData.map((item) => ({
            year: item.year,
            value: item.colorectalQualified,
          }))}
          color="#4caf50"
        />
        <YearlyTrendChart
          title="Prostate Screening - Registered"
          data={chartData.map((item) => ({
            year: item.year,
            value: item.prostate,
          }))}
          color="#ed6c02"
        />
        <YearlyTrendChart
          title="Prostate Screening - Qualified"
          data={chartData.map((item) => ({
            year: item.year,
            value: item.prostateQualified,
          }))}
          color="#ff9800"
        />
        <YearlyTrendChart
          title="Cervical Screening - Registered"
          data={chartData.map((item) => ({
            year: item.year,
            value: item.cervical,
          }))}
          color="#9c27b0"
        />
        <YearlyTrendChart
          title="Cervical Screening - Qualified"
          data={chartData.map((item) => ({
            year: item.year,
            value: item.cervicalQualified,
          }))}
          color="#ba68c8"
        />
      </Box>
    </Box>
  );
}
