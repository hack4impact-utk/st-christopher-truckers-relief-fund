"use client";
import { Box, Typography, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts";

import { HealthyHabitsTrackingForm } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type ModularBarChartProps = {
  trackingForms: HealthyHabitsTrackingForm[];
  graphLabel: string;
  dataKey: keyof HealthyHabitsTrackingForm;
  title: string;
};

type WeeklyDataPoint = {
  weekStart: Date;
  total: number;
  label: string;
};

export default function ModularBarChart({
  trackingForms,
  graphLabel,
  dataKey,
  title,
}: ModularBarChartProps) {
  const theme = useTheme();

  const getWeeklyData = () => {
    const sortedData = trackingForms.sort((a, b) =>
      dayjsUtil(a.submittedDate, "MM/DD/YYYY").diff(
        dayjsUtil(b.submittedDate, "MM/DD/YYYY"),
      ),
    );

    const weeklyData = sortedData.reduce(
      (acc: Record<string, WeeklyDataPoint>, form) => {
        const date = dayjsUtil(form.submittedDate, "MM/DD/YYYY");
        const weekStart = date.startOf("week").toDate();
        const weekKey = weekStart.toISOString();

        if (!acc[weekKey]) {
          acc[weekKey] = {
            weekStart,
            total: 0,
            label: `Week of ${dayjsUtil(weekStart).format("MM/DD")}`,
          };
        }

        acc[weekKey].total += Number(form[dataKey]) || 0;

        return acc;
      },
      {},
    );

    return Object.values(weeklyData).sort(
      (a, b) => a.weekStart.getTime() - b.weekStart.getTime(),
    );
  };

  const weeklyData = getWeeklyData();

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
            data: weeklyData.map((item) => item.label),
            scaleType: "band",
            label: "Week",
          },
        ]}
        series={[
          {
            data: weeklyData.map((item) => item.total),
            label: graphLabel,
            color: theme.palette.primary.main,
          },
        ]}
      />
    </Box>
  );
}
