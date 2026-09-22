import type { NextConfig } from "next";

/** Slash-less so it survives Windows shells; unset locally so dev stays at /. */
const subPath = process.env.NEXT_PUBLIC_BASE_PATH;
const basePath = subPath ? `/${subPath}` : "";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
