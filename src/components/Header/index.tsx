import Link from "next/link";

import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header style={{ position: "relative" }}>
      <Link href="/" style={{ top: 0, left: 0, position: "absolute" }}>
        <Logo width={100} height={100} alt="SCF Logo" />
      </Link>
    </header>
  );
}
