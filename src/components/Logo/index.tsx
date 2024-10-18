import Image from "next/image";

import logo from "@/app/icon.svg";

type LogoProps = {
  width: number;
  height: number;
  alt: string;
};

export default function Logo({ width, height, alt }: LogoProps) {
  return <Image src={logo} alt={alt} width={width} height={height} />;
}
