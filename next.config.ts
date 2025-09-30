import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const baseConfig: NextConfig = {
  reactStrictMode: true,
};

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

// 👇 only one export!
export default withPWA(baseConfig);
