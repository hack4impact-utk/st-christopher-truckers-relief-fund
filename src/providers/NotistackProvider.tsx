"use client";

import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";

type NotistackProviderProps = {
  children: ReactNode;
};

export default function NotistackProvider({
  children,
}: Readonly<NotistackProviderProps>): ReactNode {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      {children}
    </SnackbarProvider>
  );
}
