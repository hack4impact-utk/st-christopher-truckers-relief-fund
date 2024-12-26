import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * The router cache is responsible for caching pages.
   * This causes issues with your authentication state changes (like when you sign in).
   * To fix this, we disable the router cache for dynamic routes.
   * https://github.com/vercel/next.js/discussions/65487
   * https://nextjs.org/docs/14/app/api-reference/next-config-js/staleTimes
   */
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
};

const bundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);

export default bundleAnalyzerConfig;
