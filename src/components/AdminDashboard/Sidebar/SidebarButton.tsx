"use client";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
} from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

import getButtonStyles from "./getButtonStyles";

type SidebarButtonProps = {
  pathname: string;
  theme: Theme;
  href: string;
  icon: ReactNode;
  label: string;
  padLeft?: boolean;
};

export default function SidebarButton({
  pathname,
  theme,
  href,
  icon,
  label,
  padLeft,
}: Readonly<SidebarButtonProps>): ReactNode {
  const { color, backgroundColor, hoverBackgroundColor } = getButtonStyles(
    theme,
    pathname,
    href,
  );

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <ListItem disablePadding>
        <ListItemButton
          sx={{
            backgroundColor: backgroundColor,
            "&:hover": { backgroundColor: hoverBackgroundColor },
            paddingLeft: padLeft ? 4 : undefined,
          }}
        >
          <ListItemIcon sx={{ color: color }}>{icon}</ListItemIcon>
          <ListItemText primary={label} sx={{ color: color }} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}
