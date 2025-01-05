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

export default function ModularBarChart({
  trackingForms,
  graphLabel,
  dataKey,
  title,
}: ModularBarChartProps) {
  const theme = useTheme();

  const getChartData = () => {
    return trackingForms
      .sort((a, b) =>
        dayjsUtil(a.submittedDate, "MM/DD/YYYY").diff(
          dayjsUtil(b.submittedDate, "MM/DD/YYYY"),
        ),
      )
      .map((form) => ({
        value: Number(form[dataKey]) || 0,
        label: `Week of ${dayjsUtil(form.submittedDate, "MM/DD/YYYY").format("MM/DD/YY")}`,
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
