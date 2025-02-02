"use client";
import { Box, Typography, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { ReactNode } from "react";

import { HealthyHabitsTrackingForm } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type ModularBarChartProps = {
  trackingForms: HealthyHabitsTrackingForm[];
  graphLabel: string;
  dataKey: keyof HealthyHabitsTrackingForm;
  title: string;
};

type ChartData = {
  label: string;
  value: number;
};

export default function ModularBarChart({
  trackingForms,
  graphLabel,
  dataKey,
  title,
}: ModularBarChartProps): ReactNode {
  const theme = useTheme();

  const getChartData = (): ChartData[] => {
    return trackingForms
      .sort((a, b) =>
        dayjsUtil
          .utc(a.weekOfSubmission)
          .diff(dayjsUtil.utc(b.weekOfSubmission)),
      )
      .map((form) => ({
        value: Number(form[dataKey]) || null,
        label: `Week of ${dayjsUtil.utc(form.weekOfSubmission).format("MM/DD/YY")}`,
      }));
  };

  const chartData = getChartData();

  return (
    <Box
      sx={{
        height: 200,
        width: "100%",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {title}
      </Typography>
      <BarChart
        xAxis={[
          {
            data: chartData.map((item) => item.label),
            scaleType: "band",
            label: "Date",
          },
        ]}
        series={[
          {
            data: chartData.map((item) => item.value),
            label: graphLabel,
            color: theme.palette.primary.main,
          },
        ]}
      />
    </Box>
  );
}
