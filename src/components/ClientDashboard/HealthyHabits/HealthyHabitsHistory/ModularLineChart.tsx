"use client";
import { Box, Typography, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { ReactNode } from "react";

import { HealthyHabitsTrackingForm } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type BaseChart = {
  trackingForms: HealthyHabitsTrackingForm[];
  primaryLabel: string;
  dataKey: keyof HealthyHabitsTrackingForm;
  title: string;
};

type OneLineChart = BaseChart & {
  type: "one-line";
};

type TwoLineChart = BaseChart & {
  type: "two-line";
  dataKey2: keyof HealthyHabitsTrackingForm;
  secondaryLabel: string;
};

type ChartData = {
  x: Date;
  y: number;
  y2?: number;
};

type Series = {
  data: number[];
  label: string;
  color: string;
  curve: "linear";
};

function useChartData(props: OneLineChart | TwoLineChart): {
  chartData: ChartData[];
  series: Series[];
} {
  const theme = useTheme();

  const chartData = props.trackingForms
    .filter((entry) => entry[props.dataKey] !== null)
    .sort((a, b) =>
      dayjsUtil.utc(a.weekOfSubmission).diff(dayjsUtil.utc(b.weekOfSubmission)),
    )
    .map((entry) => {
      const baseData: ChartData = {
        x: dayjsUtil.utc(entry.weekOfSubmission).toDate(),
        y: Number(entry[props.dataKey]) || 0,
      };

      if (props.type === "two-line") {
        return {
          ...baseData,
          y2: Number(entry[props.dataKey2]) || 0,
        };
      }

      return baseData;
    });

  const series: Series[] = [
    {
      data: chartData.map((item) => item.y),
      label: props.primaryLabel,
      color: theme.palette.primary.main,
      curve: "linear",
    },
  ];

  if (props.type === "two-line") {
    series.push({
      data: chartData.map((item) => item.y2 ?? 0),
      label: props.secondaryLabel,
      color: theme.palette.info.main,
      curve: "linear",
    });
  }

  return { chartData, series };
}

type ChartDisplayProps = {
  title: string;
  chartData: ChartData[];
  series: Series[];
};

function ChartDisplay({
  title,
  chartData,
  series,
}: Readonly<ChartDisplayProps>): ReactNode {
  return (
    <Box sx={{ height: 200, width: "100%" }}>
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

export default function ModularLineChart(
  props: OneLineChart | TwoLineChart,
): ReactNode {
  const { chartData, series } = useChartData(props);

  return (
    <ChartDisplay title={props.title} chartData={chartData} series={series} />
  );
}
