/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/**",
      },
    ],
    unoptimized: false,
  },
  // Enable static exports if needed
  // output: 'export',
  env: {
    GOOGLE_SHEET_URL: process.env.GOOGLE_SHEET_URL,
  },
};

export default nextConfig;
