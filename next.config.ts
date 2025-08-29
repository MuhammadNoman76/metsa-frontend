/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: "export"' to allow dynamic routing
  // The app needs server-side capabilities for dynamic document IDs
  webpack: (config: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
    };
    return config;
  },
};

module.exports = nextConfig;
