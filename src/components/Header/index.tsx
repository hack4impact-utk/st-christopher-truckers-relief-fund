import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "@mui/material";
import Link from "next/link";

import Logo from "@/components/Logo";
import getUserSession from "@/utils/getUserSession";

export default async function Header() {
  const session = await getUserSession();

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
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        backgroundColor: "white",
        zIndex: 999,
      }}
    >
      <Link href="/">
        <Logo width={100} height={100} alt="SCF Logo" />
      </Link>
      {session && (
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          href="/settings"
          endIcon={<SettingsIcon />}
        >
          Settings
        </Button>
      )}
    </header>
  );
}
