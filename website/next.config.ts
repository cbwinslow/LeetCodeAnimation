import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Allow GIF animations to work properly
  },
  // Serve static files from parent directory
  async rewrites() {
    return [
      {
        source: '/:problem/Animation/:file',
        destination: '/../:problem/Animation/:file',
      },
    ]
  },
};

export default nextConfig;
