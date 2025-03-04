import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === 'development' ? false : undefined,
  reloadOnOnline: true,
  additionalPrecacheEntries: [
    { url: '/_next/static/', revision: null },
    { url: '/offline', revision: null }
  ]
});

const nextConfig: NextConfig = withSerwist({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
});

export default nextConfig;
