import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";

import { Header } from "@/components/Header";
import NextAuthProvider from "@/providers/NextAuthProvider";
import NotistackProvider from "@/providers/NotistackProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import theme from "@/styles/theme";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "St. Christopher Truckers Relief Fund",
  description:
    "Enroll in a variety of healthy habits programs through the St. Christopher Truckers Relief Fund",
  authors: [{ name: "Hack4Impact UTK", url: "https://utk.hack4impact.org/" }],
  applicationName: "St. Christopher Truckers Relief Fund",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactNode {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <NextAuthProvider>
              <NotistackProvider>
                <ReactQueryProvider>
                  <CssBaseline />
                  <NextTopLoader color="#183766" showSpinner={false} />
                  <Header />
                  {children}
                </ReactQueryProvider>
              </NotistackProvider>
            </NextAuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
