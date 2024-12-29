import { Theme } from "@mui/material";

export default function getButtonStyles(
  theme: Theme,
  pathname: string,
  href: string,
) {
  const isCurrentPage = pathname === href;

  return {
    backgroundColor: isCurrentPage ? theme.palette.primary.main : "inherit",
    hoverBackgroundColor: isCurrentPage
      ? theme.palette.primary.light
      : "lightgray",
    color: isCurrentPage ? theme.palette.primary.contrastText : "black",
  };
}
