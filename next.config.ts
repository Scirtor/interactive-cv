import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: { cpus: 2 },
  async redirects() {
    return [{ source: "/cv.pdf", destination: "/resume", permanent: false }];
  },
};

export default nextConfig;
