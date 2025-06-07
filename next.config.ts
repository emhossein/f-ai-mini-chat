import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Added for static export
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Required for static export with next/image
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    allowedDevOrigins: [
      "https://6000-firebase-studio-1749217045008.cluster-l6vkdperq5ebaqo3qy4ksvoqom.cloudworkstations.dev",
      // You can add more trusted origins here if needed
    ],
  },
};

export default nextConfig;
