import type { NextConfig } from "next";

const configuredBackend =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
  "https://api.bonksaz.ir";
const API_ORIGIN = new URL(
  configuredBackend.includes("://")
    ? configuredBackend
    : `https://${configuredBackend}`
);
if (
  API_ORIGIN.protocol === "http:" &&
  API_ORIGIN.hostname.endsWith("bonksaz.ir")
) {
  API_ORIGIN.protocol = "https:";
}
const API_PROTOCOL = API_ORIGIN.protocol.replace(":", "") as "http" | "https";

const nextConfig: NextConfig = {
  // Liara gzip-encodes responses. Compressing again in Next makes the browser
  // fail to decode the body.
  compress: false,
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
