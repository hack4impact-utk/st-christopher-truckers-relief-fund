"use client";
import { Box, Typography, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts";

import { HealthyHabitsTrackingForm } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type ModularLineChartProps = {
  trackingForms: HealthyHabitsTrackingForm[];
  graphLabel: string;
  dataKey: keyof HealthyHabitsTrackingForm;
  title: string;
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

type ChartConfig = {
  chartData: RegularChartDataPoint[] | BloodPressureChartDataPoint[];
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
  title,
}: ModularLineChartProps) {
  const theme = useTheme();

  const parseBloodPressure = (
    bp: string,
  ): { systolic: number; diastolic: number } => {
    const [systolic, diastolic] = bp.split("/").map((num) => parseInt(num, 10));
    return { systolic, diastolic };
  };

  const getChartDataAndSeries = (): ChartConfig => {
    const sortedData = trackingForms.sort((a, b) =>
      dayjsUtil(a.submittedDate, "MM/DD/YYYY").diff(
        dayjsUtil(b.submittedDate, "MM/DD/YYYY"),
      ),
    );

    const isBloodPressure = dataKey === "bloodPressure";

    if (isBloodPressure) {
      const chartData: BloodPressureChartDataPoint[] = sortedData.map(
        (entry) => ({
          x: dayjsUtil(entry.submittedDate, "MM/DD/YYYY").toDate(),
          ...parseBloodPressure(entry[dataKey] as string),
        }),
      );

      return {
        chartData,
        series: [
          {
            data: chartData.map((item) => item.systolic),
            label: "Systolic",
            color: theme.palette.primary.main,
            curve: "linear",
          },
          {
            data: chartData.map((item) => item.diastolic),
            label: "Diastolic",
            color: theme.palette.info.main,
            curve: "linear",
          },
        ],
      };
    }

    const chartData: RegularChartDataPoint[] = sortedData.map((entry) => ({
      x: dayjsUtil(entry.submittedDate, "MM/DD/YYYY").toDate(),
      y: entry[dataKey] as number,
    }));

    return {
      chartData,
      series: [
        {
          data: chartData.map((item) => item.y),
          label: graphLabel,
          color: theme.palette.primary.main,
          curve: "linear",
        },
      ],
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
            valueFormatter: (value) => dayjsUtil(value).format("MM/DD/YYYY"),
            tickInterval: chartData.map((item) => item.x),
          },
        ]}
        series={series}
      />
    </Box>
  );
}
