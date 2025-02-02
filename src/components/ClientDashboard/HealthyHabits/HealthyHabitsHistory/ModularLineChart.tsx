"use client";
import { Box, Typography, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { ReactNode } from "react";

import { HealthyHabitsTrackingForm } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type ModularLineChartProps = {
  trackingForms: HealthyHabitsTrackingForm[];
  graphLabel: string;
  dataKey: keyof HealthyHabitsTrackingForm;
  dataKey2?: keyof HealthyHabitsTrackingForm;
  title: string;
  secondaryLabel?: string;
};

type RegularChartDataPoint = {
  x: Date;
  y?: number;
  y2?: number;
};

type ChartConfig = {
  chartData: RegularChartDataPoint[];
  series: {
    data: number[];
    label: string;
    color: string;
    curve: "linear";
  }[];
};

export default function ModularLineChart({
  trackingForms,
  graphLabel,
  dataKey,
  dataKey2,
  secondaryLabel,
  title,
}: ModularLineChartProps): ReactNode {
  const theme = useTheme();

  const getChartDataAndSeries = (): ChartConfig => {
    const sortedData = trackingForms.sort((a, b) =>
      dayjsUtil.utc(a.weekOfSubmission).diff(dayjsUtil.utc(b.weekOfSubmission)),
    );

    const chartData: RegularChartDataPoint[] = sortedData.map((entry) => ({
      x: dayjsUtil.utc(entry.weekOfSubmission).toDate(),
      y: entry[dataKey] as number,
      ...(dataKey2 && { y2: entry[dataKey2] as number }),
    }));

    const series = [
      {
        data: chartData.map((item) => item.y ?? 0),
        label: graphLabel,
        color: theme.palette.primary.main,
        curve: "linear" as const,
      },
    ];

    if (dataKey2 && secondaryLabel) {
      series.push({
        data: chartData.map((item) => item.y2 ?? 0),
        label: secondaryLabel,
        color: theme.palette.info.main,
        curve: "linear",
      });
    }

    return {
      chartData,
      series,
    };
  };

  const { chartData, series } = getChartDataAndSeries();

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
      <LineChart
        xAxis={[
          {
            data: chartData.map((item) => item.x),
            label: "Date",
            scaleType: "time",
            valueFormatter: (value): string =>
              `Week of ${dayjsUtil.utc(value).format("MM/DD/YYYY")}`,
            tickInterval: chartData.map((item) => item.x),
          },
        ]}
        series={series}
      />
    </Box>
  );
}
