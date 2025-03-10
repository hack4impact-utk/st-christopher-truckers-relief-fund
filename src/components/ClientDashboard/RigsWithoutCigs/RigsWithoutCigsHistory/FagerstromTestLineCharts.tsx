"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { ReactNode } from "react";

import { FagerstromTest } from "@/types";
import dayjsUtil from "@/utils/dayjsUtil";

type FagerstromTestLineCharts = {
  fagerstromTests: FagerstromTest[];
};

type ChartData = {
  x: Date;
  y: number;
};

type Series = {
  data: number[];
  label: string;
  color: string;
  curve: "linear";
};

function useCigaretteChartData(fagerstromTests: FagerstromTest[]): {
  cigaretteData: ChartData[];
  cigaretteSeries: Series[];
} {
  const theme = useTheme();

  const cigaretteData = fagerstromTests
    .filter((entry) => entry.doesUseCigarettes)
    .sort((a, b) =>
      dayjsUtil.utc(a.submittedDate).diff(dayjsUtil.utc(b.submittedDate)),
    )
    .map((entry) => {
      const baseData: ChartData = {
        x: dayjsUtil.utc(entry.submittedDate).toDate(),
        y: Number(entry.cigaretteFagerstromScore) || 0,
      };

      return baseData;
    });

  const cigaretteSeries: Series[] = [
    {
      data: cigaretteData.map((item) => item.y),
      label: "Fagerstrom Test Score",
      color: theme.palette.primary.main,
      curve: "linear",
    },
  ];

  return { cigaretteData, cigaretteSeries };
}

function useTobaccoChartData(fagerstromTests: FagerstromTest[]): {
  tobaccoData: ChartData[];
  tobaccoSeries: Series[];
} {
  const theme = useTheme();

  const tobaccoData = fagerstromTests
    .filter((entry) => entry.doesUseSmokelessTobacco)
    .sort((a, b) =>
      dayjsUtil.utc(a.submittedDate).diff(dayjsUtil.utc(b.submittedDate)),
    )
    .map((entry) => {
      const baseData: ChartData = {
        x: dayjsUtil.utc(entry.submittedDate).toDate(),
        y: Number(entry.tobaccoFagerstromScore) || 0,
      };

      return baseData;
    });

  const tobaccoSeries: Series[] = [
    {
      data: tobaccoData.map((item) => item.y),
      label: "Fagerstrom Test Score",
      color: theme.palette.primary.main,
      curve: "linear",
    },
  ];

  return { tobaccoData, tobaccoSeries };
}

export default function FagerstromTestLineCharts({
  fagerstromTests,
}: Readonly<FagerstromTestLineCharts>): ReactNode {
  const { cigaretteData, cigaretteSeries } =
    useCigaretteChartData(fagerstromTests);
  const { tobaccoData, tobaccoSeries } = useTobaccoChartData(fagerstromTests);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ height: 200, width: "100%" }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Cigarette Fagerstrom Test Scores
        </Typography>
        <LineChart
          xAxis={[
            {
              data: cigaretteData.map((item) => item.x),
              label: "Date",
              scaleType: "time",
              valueFormatter: (value): string =>
                `${dayjsUtil.utc(value).format("MM/DD/YYYY")}`,
              tickInterval: cigaretteData.map((item) => item.x),
            },
          ]}
          series={cigaretteSeries}
        />
      </Box>
      <Box sx={{ height: 200, width: "100%" }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Tobacco Fagerstrom Test Scores
        </Typography>
        <LineChart
          xAxis={[
            {
              data: tobaccoData.map((item) => item.x),
              label: "Date",
              scaleType: "time",
              valueFormatter: (value): string =>
                `${dayjsUtil.utc(value).format("MM/DD/YYYY")}`,
              tickInterval: tobaccoData.map((item) => item.x),
            },
          ]}
          series={tobaccoSeries}
        />
      </Box>
    </Box>
  );
}
