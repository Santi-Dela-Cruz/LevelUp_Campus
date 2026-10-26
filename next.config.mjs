import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    // Avoid restoring stale filesystem packs after interrupted local rebuilds.
    // HMR keeps an in-memory cache; production retains Next's default cache.
    if (dev) config.cache = { type: "memory" };
    return config;
  },
};

// Select output by Next's explicit phase, including worker/config reloads.
export default (phase) => ({
  ...nextConfig,
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
});

