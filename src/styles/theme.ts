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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "lightgray",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "gray",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
});

export default theme;
