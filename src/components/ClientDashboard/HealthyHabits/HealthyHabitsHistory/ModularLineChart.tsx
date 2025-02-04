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

type ModularLineChartProps = OneLineChart | TwoLineChart;

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

export default function ModularLineChart(
  props: ModularLineChartProps,
): ReactNode {
  const theme = useTheme();

  const getChartData = (chartProps: ModularLineChartProps): ChartData[] => {
    const { trackingForms, dataKey, type } = chartProps;

    return trackingForms
      .filter((entry) => entry[dataKey] !== null)
      .sort((a, b) =>
        dayjsUtil
          .utc(a.weekOfSubmission)
          .diff(dayjsUtil.utc(b.weekOfSubmission)),
      )
      .map((entry) => {
        const baseData: ChartData = {
          x: dayjsUtil.utc(entry.weekOfSubmission).toDate(),
          y: Number(entry[dataKey]) || 0,
        };

        if (type === "two-line") {
          return {
            ...baseData,
            y2: Number(entry[chartProps.dataKey2]) || 0,
          };
        }

        return baseData;
      });
  };

  const chartData = getChartData(props);

  const getSeries = (chartProps: ModularLineChartProps): Series[] => {
    const { type } = chartProps;

    const series: Series[] = [
      {
        data: chartData.map((item) => item.y),
        label: chartProps.primaryLabel,
        color: theme.palette.primary.main,
        curve: "linear" as const,
      },
    ];

    if (type === "two-line") {
      series.push({
        data: chartData.map((item) => item.y2 ?? 0),
        label: chartProps.secondaryLabel,
        color: theme.palette.info.main,
        curve: "linear",
      });
    }

    return series;
  };

  const series = getSeries(props);

  return (
    <Box
      sx={{
        height: 200,
        width: "100%",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {props.title}
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
