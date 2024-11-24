"use client";
import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";

export default function Sidebar() {
  const links = [
    { href: "/dashboard/admin/programs", label: "Programs" },
    { href: "/dashboard/admin/clients", label: "Clients" },
    { href: "/dashboard/admin/notifications", label: "Notifications" },
    { href: "/dashboard/admin/applications", label: "Applications" },
  ];

  return (
    <List>
      {links.map((link) => (
        <ListItem key={link.href} component="a" href={link.href}>
          <ListItemText primary={link.label} />
        </ListItem>
      ))}
    </List>
  );
}
