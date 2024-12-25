"use client";
import { Box, Typography, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import dayjs from "dayjs";

import { HealthyHabitsTrackingForm } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type WeightLineChartProps = {
  trackingForms: HealthyHabitsTrackingForm[];
};

export default function WeightLineChart({
  trackingForms,
}: WeightLineChartProps) {
  const theme = useTheme();

  const chartData = trackingForms
    .sort((a, b) =>
      dayjs(a.submittedDate, "MM/DD/YYYY").diff(
        dayjs(b.submittedDate, "MM/DD/YYYY"),
      ),
    )
    .map((entry) => ({
      x: dayjs(entry.submittedDate, "MM/DD/YYYY").toDate(),
      y: entry.weight,
    }));

  return (
    <Box
      sx={{
        height: 200,
        width: "100%",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Weight
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
        series={[
          {
            data: chartData.map((item) => item.y),
            label: "Weight (lbs)",
            color: theme.palette.primary.main,
            curve: "linear",
          },
        ]}
      />
    </Box>
  );
}
