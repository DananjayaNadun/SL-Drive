/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/SL-Drive',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '/SL-Drive',
  },
  devIndicators: false,
};

module.exports = nextConfig;
