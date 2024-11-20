"use client";
import type {} from "@mui/lab/themeAugmentation";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    primary: {
      main: "#183766",
    },
    secondary: {
      main: "#183766",
    },
  },
});

export default theme;
