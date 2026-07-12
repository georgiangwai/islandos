import type { NextConfig } from "next";

const securityHeaders = [
  // stop the site being embedded in an iframe (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // browsers must respect declared content types, no MIME sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // don't leak full URLs to other sites
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // this site never needs these browser features
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
