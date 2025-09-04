import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dvb2pkzndm1w4.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    S3_REGION: process.env.S3_REGION,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    CLOUDFRONT_DOMAIN: process.env.CLOUDFRONT_DOMAIN,
  },
};

export default nextConfig;
