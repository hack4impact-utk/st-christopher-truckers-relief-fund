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
import { LineChart } from "@mui/x-charts";
import { ReactNode } from "react";

import { ProgramEnrollment, ScreeningRequest } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

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

function calculateMetrics(
  screeningRequests: ScreeningRequest[],
): ScreeningMetrics {
  return screeningRequests.reduce(
    (acc, request) => {
      acc.totalRegistrations++;

      switch (request.name) {
        case "Colon / Colorectal Screening":
          acc.colorectalRegistered++;
          if (request.status === "qualified") acc.colorectalQualified++;
          break;
        case "Prostate Screening":
          acc.prostateRegistered++;
          if (request.status === "qualified") acc.prostateQualified++;
          break;
        case "Cervical Cancer Screening":
          acc.cervicalRegistered++;
          if (request.status === "qualified") acc.cervicalQualified++;
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

  // Filter requests for last month
  const lastMonthRequests = screeningRequests.filter((request) => {
    const requestDate = dayjsUtil(request.submittedDate);
    return requestDate.isAfter(lastMonth) && requestDate.isBefore(currentMonth);
  });

  return calculateMetrics(lastMonthRequests);
}

function getYearlyData(screeningRequests: ScreeningRequest[]): YearlyData[] {
  if (screeningRequests.length > 0) {
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
          return (
            requestDate.isAfter(yearStart) && requestDate.isBefore(yearEnd)
          );
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
  return [];
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

      {/* Line Charts */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Yearly Screening Trends
        </Typography>
        <Box sx={{ height: 400, width: "100%" }}>
          <LineChart
            xAxis={[
              {
                data: chartData.map((item) => item.year),
                label: "Year",
                scaleType: "linear",
                valueFormatter: (value) => value.toString(),
                tickMinStep: 1,
              },
            ]}
            series={[
              {
                data: chartData.map((item) => item.total),
                label: "Total Registrations",
                color: "#1976d2",
              },
              {
                data: chartData.map((item) => item.colorectal),
                label: "Colorectal Registered",
                color: "#2e7d32",
              },
              {
                data: chartData.map((item) => item.colorectalQualified),
                label: "Colorectal Qualified",
                color: "#4caf50",
              },
              {
                data: chartData.map((item) => item.prostate),
                label: "Prostate Registered",
                color: "#ed6c02",
              },
              {
                data: chartData.map((item) => item.prostateQualified),
                label: "Prostate Qualified",
                color: "#ff9800",
              },
              {
                data: chartData.map((item) => item.cervical),
                label: "Cervical Registered",
                color: "#9c27b0",
              },
              {
                data: chartData.map((item) => item.cervicalQualified),
                label: "Cervical Qualified",
                color: "#ba68c8",
              },
            ]}
            slotProps={{
              legend: {
                direction: "row",
                position: { vertical: "bottom", horizontal: "middle" },
                padding: 20,
                hidden: false,
                itemGap: 20,
              },
            }}
            margin={{ top: 20, right: 20, bottom: 150, left: 20 }}
          />
        </Box>
      </Box>

      {/* Monthly Metrics Table */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Last Month&apos;s Metrics
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
    </Box>
  );
}
