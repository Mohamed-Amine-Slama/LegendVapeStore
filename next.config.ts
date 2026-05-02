import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Next/Image to load remote images from any host. Product
    // images stored in MongoDB can come from the lepetitvapoteur CDN,
    // manufacturer sites, or Cloudinary etc. — narrow this list once
    // the catalogue stabilises.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
