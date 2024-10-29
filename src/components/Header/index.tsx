import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";
import Link from "next/link";

import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        height: "100px",
        width: "100vw",
        justifyContent: "space-between",
        alignItems: "center",
        paddingInline: "1.5rem",
        position: "fixed",
      }}
    >
      <Link href="/">
        <Logo width={100} height={100} alt="SCF Logo" />
      </Link>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        href="/settings"
        endIcon={<SettingsIcon />}
      >
        Settings
      </Button>
    </header>
  );
}
