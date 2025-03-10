import Image from "next/image";
import { CSSProperties, ReactNode } from "react";

import logo from "@/app/icon.svg";

type LogoProps = {
  width: number;
  height: number;
  alt: string;
  style?: CSSProperties;
};

export default function Logo({
  width,
  height,
  alt,
  style,
}: Readonly<LogoProps>): ReactNode {
  return (
    <Image src={logo} alt={alt} width={width} height={height} style={style} />
  );
}
