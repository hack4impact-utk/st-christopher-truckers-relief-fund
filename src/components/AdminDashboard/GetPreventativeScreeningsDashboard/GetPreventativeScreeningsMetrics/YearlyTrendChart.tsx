import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { ReactNode } from "react";

type YearlyTrendChartProps = {
  title: string;
  data: {
    year: number;
    value: number;
  }[];
  color: string;
};

export default function YearlyTrendChart({
  title,
  data,
  color,
}: Readonly<YearlyTrendChartProps>): ReactNode {
  const sortedData = data.toSorted((a, b) => a.year - b.year);

  return (
    <Box sx={{ width: "75%" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Box sx={{ height: 300, padding: 4 }}>
        <LineChart
          xAxis={[
            {
              data: sortedData.map((item) => item.year),
              label: "Year",
              scaleType: "linear",
              valueFormatter: (value): string => value.toString(),
              tickInterval: sortedData.map((item) => item.year),
            },
          ]}
          series={[
            {
              data: sortedData.map((item) => item.value),
              label: title,
              color: color,
            },
          ]}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </Box>
    </Box>
  );
}
