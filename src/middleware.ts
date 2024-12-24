export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/change-password",
    "/dashboard",
    "/dashboard/:path*",
    "/settings",
    "/settings/:path*",
    "/verify-email",
    "/verify-email/:path*",
  ],
};
