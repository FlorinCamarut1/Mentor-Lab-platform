/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "licenta-florin.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
