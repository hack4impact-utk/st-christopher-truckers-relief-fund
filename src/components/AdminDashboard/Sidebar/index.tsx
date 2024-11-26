"use client";

import { Apps, Home, Notifications, People } from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter
import React from "react";

const drawerWidth = 240;

export default function Sidebar() {
  const pathname = usePathname(); // Get the current pathname

  const links = [
    { href: "/dashboard/admin/programs", label: "Programs", icon: <Apps /> },
    { href: "/dashboard/admin/clients", label: "Clients", icon: <People /> },
    {
      href: "/dashboard/admin/notifications",
      label: "Notifications",
      icon: <Notifications />,
    },
    {
      href: "/dashboard/admin/applications",
      label: "Applications",
      icon: <Home />,
    },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          marginTop: "100px",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            passHref
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor: pathname === link.href ? "blue" : "inherit",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: pathname === link.href ? "white" : "inherit",
                  }}
                >
                  {link.icon}
                </ListItemIcon>
                <ListItemText
                  primary={link.label}
                  sx={{
                    color: pathname === link.href ? "white" : "inherit",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
