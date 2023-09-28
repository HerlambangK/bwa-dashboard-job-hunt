/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plppbdifdmymaqzktdbz.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
