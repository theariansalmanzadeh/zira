import type { NextConfig } from "next";

const API_URL =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
  "https://api.bonksaz.ir/api/v1/admin/";
const API_ORIGIN = new URL(API_URL);
const API_PROTOCOL = API_ORIGIN.protocol.replace(":", "") as "http" | "https";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_ORIGIN.origin}/api/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: API_PROTOCOL,
        hostname: API_ORIGIN.hostname,
      },
    ],
  },
};

export default nextConfig;
