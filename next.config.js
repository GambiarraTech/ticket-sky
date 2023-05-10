/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '80',
        pathname: 'public/images/quadrado.png',
      },
    ],
  },
};

module.exports = nextConfig;
