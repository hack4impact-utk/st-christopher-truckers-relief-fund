/* eslint-disable camelcase */
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "St. Christopher Truckers Relief Fund",
    short_name: "SCF",
    description:
      "Enroll in a variety of healthy habits programs through the St. Christopher Truckers Relief Fund",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
