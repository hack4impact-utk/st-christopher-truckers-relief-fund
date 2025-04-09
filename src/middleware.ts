export { default } from "next-auth/middleware";

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
