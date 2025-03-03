import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    HOST_API_URL: 'http://localhost:3000'
  }
};

export default nextConfig;
