"use client";
import { Box, Typography, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts";

import { HealthyHabitsTrackingForm } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type ModularLineChartProps = {
  trackingForms: HealthyHabitsTrackingForm[];
  graphLabel?: string;
  dataKey: keyof HealthyHabitsTrackingForm;
  title?: string;
};

type RegularChartDataPoint = {
  x: Date;
  y: number;
};

type BloodPressureChartDataPoint = {
  x: Date;
  systolic: number;
  diastolic: number;
};

export default function ModularLineChart({
  trackingForms,
  graphLabel,
  dataKey,
  title,
}: ModularLineChartProps) {
  const theme = useTheme();

  // Special handling for blood pressure
  const isBloodPressure = dataKey === "bloodPressure";

  const sortedData = trackingForms.sort((a, b) =>
    dayjsUtil(a.submittedDate, "MM/DD/YYYY").diff(
      dayjsUtil(b.submittedDate, "MM/DD/YYYY"),
    ),
  );

  const parseBloodPressure = (
    bp: string,
  ): { systolic: number; diastolic: number } => {
    const [systolic, diastolic] = bp.split("/").map((num) => parseInt(num, 10));
    return { systolic, diastolic };
  };

  const chartData: RegularChartDataPoint[] | BloodPressureChartDataPoint[] =
    isBloodPressure
      ? sortedData.map((entry) => ({
          x: dayjsUtil(entry.submittedDate, "MM/DD/YYYY").toDate(),
          ...parseBloodPressure(entry[dataKey] as string),
        }))
      : sortedData.map((entry) => ({
          x: dayjsUtil(entry.submittedDate, "MM/DD/YYYY").toDate(),
          y: entry[dataKey] as number,
        }));

  return (
    <Box
      sx={{
        height: 200,
        width: "100%",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {title || graphLabel}
      </Typography>
      <LineChart
        xAxis={[
          {
            data: chartData.map((item) => item.x),
            label: "Date",
            scaleType: "time",
            valueFormatter: (value) => dayjsUtil(value).format("MM/DD/YYYY"),
            tickInterval: chartData.map((item) => item.x),
          },
        ]}
        series={
          isBloodPressure
            ? [
                {
                  data: (chartData as BloodPressureChartDataPoint[]).map(
                    (item) => item.systolic,
                  ),
                  label: "Systolic",
                  color: theme.palette.primary.main,
                  curve: "linear",
                },
                {
                  data: (chartData as BloodPressureChartDataPoint[]).map(
                    (item) => item.diastolic,
                  ),
                  label: "Diastolic",
                  color: theme.palette.secondary.main, // TODO: Change to secondary color
                  curve: "linear",
                },
              ]
            : [
                {
                  data: (chartData as RegularChartDataPoint[]).map(
                    (item) => item.y,
                  ),
                  label: graphLabel,
                  color: theme.palette.primary.main,
                  curve: "linear",
                },
              ]
        }
      />
    </Box>
  );
}
