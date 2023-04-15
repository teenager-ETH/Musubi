/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.module.unknownContextCritical = false
    config.module.exprContextCritical = false
    return config;
  },
};

module.exports = nextConfig;
