/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: "export"' to allow dynamic routing
  // The app needs server-side capabilities for dynamic document IDs
};

module.exports = nextConfig;
