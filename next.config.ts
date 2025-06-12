import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactStrictMode: true,
    experimental: {
        serverActions: {}, // if you're using them
        // enables /app router (already default in Next 13+)
    },
    compiler: {
        styledComponents: false, // Optional, if you're not using styled-components
    } // ✅ needed if loading product images from Medusa backend,
};

export default nextConfig;
