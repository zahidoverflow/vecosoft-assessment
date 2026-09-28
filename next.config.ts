import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/vecosoft-assessment",
  assetPrefix: "/vecosoft-assessment/",
  images: { unoptimized: true },
};

export default nextConfig;
