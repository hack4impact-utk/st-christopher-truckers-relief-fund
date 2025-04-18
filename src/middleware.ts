import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import withAuth, { NextRequestWithAuth } from "next-auth/middleware";

import { User } from "./types";

function handleClientDashboardAuthChecks(
  user: User,
  request: NextRequestWithAuth,
): NextResponse | null {
  if (user.role !== "client") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!user.isEmailVerified) {
    return NextResponse.redirect(new URL("/verify-email", request.url));
  }

  if (user.needsInformationUpdated) {
    return NextResponse.redirect(
      new URL("/update-client-information", request.url),
    );
  }

  return null;
}

function handleAdminDashboardAuthChecks(
  user: User,
  request: NextRequestWithAuth,
): NextResponse | null {
  if (user.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return null;
}

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request) {
    const user = (request.nextauth.token?.user as User) ?? null;

    if (!user) {
      return redirect("/");
    }

    const pathName = request.nextUrl.pathname;

    if (pathName.startsWith("/dashboard/client")) {
      const response = handleClientDashboardAuthChecks(user, request);

      if (response) {
        return response;
      }
    }

    if (pathName.startsWith("/dashboard/admin")) {
      const response = handleAdminDashboardAuthChecks(user, request);

      if (response) {
        return response;
      }
    }

    if (pathName.startsWith("/enrollment-form")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  },
);

export const config = {
  matcher: [
    "/change-password",
    "/dashboard",
    "/dashboard/:path*",
    "/profile",
    "/profile/:path*",
    "/verify-email",
    "/verify-email/:path*",
    "/update-client-information",
  ],
};
