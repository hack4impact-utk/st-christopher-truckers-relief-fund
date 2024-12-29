"use client";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
} from "@mui/material";
import { ReactNode } from "react";

import getButtonStyles from "@/components/AdminDashboard/Sidebar/getButtonStyles";

type CollapsibleSidebarButtonProps = {
  pathname: string;
  theme: Theme;
  href: string;
  icon: ReactNode;
  label: string;
  onClick: () => void;
  open?: boolean;
};

export default function CollapsibleSidebarButton({
  pathname,
  theme,
  href,
  icon,
  label,
  onClick,
  open = false,
}: CollapsibleSidebarButtonProps) {
  const { color, backgroundColor, hoverBackgroundColor } = getButtonStyles(
    theme,
    pathname,
    href,
  );

  return (
    <ListItem disablePadding onClick={onClick}>
      <ListItemButton
        sx={{
          backgroundColor: backgroundColor,
          "&:hover": { backgroundColor: hoverBackgroundColor },
        }}
      >
        <ListItemIcon sx={{ color: color }}>{icon}</ListItemIcon>
        <ListItemText primary={label} sx={{ color: color }} />
        {open ? (
          <ExpandLess sx={{ color: color }} />
        ) : (
          <ExpandMore sx={{ color: color }} />
        )}
      </ListItemButton>
    </ListItem>
  );
}
