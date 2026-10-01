import type { NextConfig } from "next";

/** Slash-less so it survives Windows shells; unset locally so dev stays at /. */
const subPath = process.env.NEXT_PUBLIC_BASE_PATH;
const basePath = subPath ? `/${subPath}` : "";

const isExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  ...(isExport ? { output: "export" as const } : {}),
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
